import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function QRscannerPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | scanning | success | mismatch | error
  const [message, setMessage] = useState("");

  const scannerRef = useRef(null);
  const html5QrRef = useRef(null);
  const readerId = "qr-reader-region";

  /* ── fetch expected book details ── */
  useEffect(() => {
    fetchBook();
    return () => stopScanner();
  }, [bookId]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/books/byId/${bookId}`);
      if (res.data.success) {
        setBookDetails(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching book:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── start camera scanner ── */
  const startScanner = async () => {
    setStatus("scanning");
    setMessage("");
    setScanning(true);

    try {
      const html5Qr = new Html5Qrcode(readerId);
      html5QrRef.current = html5Qr;

      await html5Qr.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        onScanSuccess,
        () => {}, // ignore per-frame scan failures
      );
    } catch (err) {
      console.error("Camera start error:", err);
      setStatus("error");
      setMessage("Camera access failed. Check permissions and try again.");
      setScanning(false);
    }
  };

  /* ── stop camera scanner ── */
  const stopScanner = async () => {
    if (html5QrRef.current) {
      try {
        await html5QrRef.current.stop();
        await html5QrRef.current.clear();
      } catch (err) {
        // scanner may already be stopped
      }
      html5QrRef.current = null;
    }
    setScanning(false);
  };

  /* ── handle a successful scan ── */
  const onScanSuccess = async (decodedText) => {
    await stopScanner();

    let scannedId = decodedText;
    try {
      const parsed = JSON.parse(decodedText);
      scannedId = parsed.bId?.toString();
    } catch {
      // decodedText was plain text/id, not JSON
    }

    if (scannedId?.toString() === bookId?.toString()) {
      setStatus("success");
      setMessage("QR matched. Processing return...");
      await handleReturn();
    } else {
      setStatus("mismatch");
      setMessage("This QR doesn't match the expected book.");
    }
  };

  /* ── call return API ── */
  const handleReturn = async () => {
    try {
      const activeRes = await api.get(`/api/borrow/active-by-book/${bookId}`);
      if (!activeRes.data.success || !activeRes.data.data) {
        setStatus("error");
        setMessage("No active borrow record found for this book.");
        return;
      }

      const borrowId = activeRes.data.data.brId; // your primary key field

      const res = await api.put(`/api/borrows/return-book/${borrowId}`, {
        status: "returned", // ← body එක add කරන්න, controller එකට මේක ඕන
      });

      if (res.data.success) {
        setMessage("Book returned successfully!");
      } else {
        setStatus("error");
        setMessage(res.data.msg || "Failed to process return.");
      }
    } catch (err) {
      console.error("Return error:", err);
      setStatus("error");
      setMessage(
        err.response?.data?.msg || "Server error while processing return.",
      );
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setMessage("");
    startScanner();
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-950 via-purple-950 to-black text-white">
        Loading...
      </div>
    );
  }

  if (!bookDetails) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-950 via-purple-950 to-black text-white">
        Book not found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-black flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-5 sm:p-8 text-white">
        {/* header */}
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-purple-300 mb-2">
            Book Return
          </p>
          <h1 className="text-xl sm:text-2xl font-bold">
            {bookDetails.bTitle}
          </h1>
          <p className="text-sm text-white/60 mt-1">by {bookDetails.bAuthor}</p>
        </div>

        {/* scanner region */}
        <div className="relative w-full aspect-square max-w-xs sm:max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-purple-400/40 bg-black/40">
          <div id={readerId} ref={scannerRef} className="w-full h-full" />

          {!scanning && status === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50">
              <div className="w-16 h-16 rounded-full bg-purple-700/80 flex items-center justify-center text-3xl">
                📷
              </div>
              <p className="text-sm text-white/70 px-6 text-center">
                Tap below to start scanning the book's QR code
              </p>
            </div>
          )}
        </div>

        {/* status message */}
        {message && (
          <div
            className={`mt-5 text-center text-sm font-semibold rounded-xl px-4 py-3 ${
              status === "success"
                ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
                : status === "mismatch" || status === "error"
                  ? "bg-rose-600/20 text-rose-300 border border-rose-500/30"
                  : "bg-purple-600/20 text-purple-200 border border-purple-500/30"
            }`}
          >
            {message}
          </div>
        )}

        {/* action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {!scanning && status !== "success" && (
            <button
              onClick={status === "idle" ? startScanner : handleRetry}
              className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-colors duration-300 font-semibold py-3 rounded-xl shadow-lg shadow-purple-900/40"
            >
              {status === "idle" ? "Start Scanning" : "Scan Again"}
            </button>
          )}

          {scanning && (
            <button
              onClick={stopScanner}
              className="w-full border-2 border-white/30 hover:border-white/50 transition-colors duration-300 font-semibold py-3 rounded-xl"
            >
              Cancel
            </button>
          )}

          {status === "success" && (
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 font-semibold py-3 rounded-xl"
            >
              Done
            </button>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-3 w-full text-xs text-white/50 hover:text-white/80 transition-colors duration-300"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default QRscannerPage;
