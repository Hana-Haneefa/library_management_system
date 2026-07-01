import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";

import readIcon from "../images/icons/book.png";
import eyeIcon from "../images/icons/eye.png";
import star from "../images/icons/star.png";
import starFill from "../images/icons/starFill.png";
import faceIcon from "../images/icons/face.png";
import replyIcon from "../images/icons/reply.png";
import msgIcon from "../images/icons/msg.png";
import sendIcon from "../images/icons/send.png";
import qr from "../images/icons/qrcode.png";
import testimg from "../images/testimg.jpg";

import BookCard from "../components/Card.jsx";
import { COVER_BASE_URL } from "../context/authContext.jsx";

function BookView() {
  const [activeTab, setActiveTab] = useState("info");
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/books/byId/${bookId}`);
      if (res.data.success) {
        setBookDetails(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching book details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimilarBooks();
  }, [bookId]);

  useEffect(() => {
    if (bookDetails?.bGenre) {
      fetchSimilarBooks(bookDetails);
    }
  }, [bookDetails]);

  const fetchSimilarBooks = async (details) => {
    if (!details) return;
    try {
      const res = await api.get(`/api/books/all-books`);
      if (res.data.success) {
        const filtered = res.data.data
          .filter(
            (b) => b.bGenre === bookDetails.bGenre && b.bId !== bookDetails.bId,
          )
          .slice(0, 6); // Limit to 6 similar books
        setSimilarBooks(filtered);
      }
    } catch (err) {
      console.error("Error fetching similar books:", err);
    }
  };

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  if (!bookDetails)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black text-white">
        Book not found
      </div>
    );

  return (
    <div className="w-full min-h-screen relative bg-black">
      {/* ── background split (decorative, hidden on mobile) ── */}
      <div className="hidden md:block absolute inset-0">
        <div className="w-1/6 h-full bg-purple-300 float-left" />
        <div className="w-5/6 h-full bg-black float-left" />
      </div>

      {/* ── main content card ── */}
      <div className="relative z-10 w-full min-h-screen md:min-h-0 md:absolute md:top-15 md:left-1/8 md:w-5/6 md:h-5/6 border-t-0 md:border-t-2 border-r-0 md:border-r-2 border-white/30 shadow-lg md:rounded-2xl bg-white/20 backdrop-blur-lg flex flex-col lg:flex-row p-4 sm:p-5 gap-4 lg:gap-2">
        {/* left: book image */}
        <div className="leftBookimg flex flex-col justify-center items-center w-full lg:w-2/4 shrink-0">
          <div className="img w-2/3 h-64 sm:h-80 lg:h-7/8 rounded-lg overflow-hidden">
            <img
              src={`${COVER_BASE_URL}/${bookDetails.coverImage}`}
              alt={bookDetails.bTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="availabelIcons flex gap-4 items-center justify-start pl-2 sm:pl-5 pt-3 font-semibold text-white text-sm sm:text-base">
            <p>Available for:</p>
            <button className="w-8 h-8 p-1 rounded-md overflow-hidden">
              <img
                src={readIcon}
                alt="listen icon"
                className="w-full h-full object-cover"
              />
            </button>
            <button className="w-8 h-8 p-1 rounded-md overflow-hidden">
              <img
                src={eyeIcon}
                alt="view icon"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* right: details */}
        <div className="rightDetails w-full lg:w-3/4">
          {/* tab buttons */}
          <div className="flex gap-1 sm:gap-2 border-b border-white/30 mb-6 overflow-x-auto">
            {["info", "reviews", "similar"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-6 py-2 whitespace-nowrap font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === tab
                    ? "border-b-2 border-purple-400 text-purple-400"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab === "info"
                  ? "Info"
                  : tab === "reviews"
                    ? "Review"
                    : "Similar Books"}
              </button>
            ))}
          </div>

          {/* info tab */}
          {activeTab === "info" && (
            <div
              id="info"
              className="infoContent w-full h-auto lg:h-full p-1 sm:p-2 md:pl-5 pt-3 text-white rounded-b-lg overflow-y-auto"
            >
              <h1 className="text-2xl sm:text-3xl font-serif font-bold">
                {bookDetails.bTitle}
              </h1>
              <p className="font-semibold text-sm sm:text-base">
                By
                <a href="#author profile" className="underline pl-2">
                  {bookDetails.bAuthor}
                </a>
              </p>

              <div className="star mt-1 text-sm mb-6 sm:mb-10 flex gap-1">
                <img
                  src={starFill}
                  alt="star"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <img
                  src={starFill}
                  alt="star"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <img
                  src={starFill}
                  alt="star"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <img src={star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5" />
                <img src={star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <p className="text-sm sm:text-base leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
                dignissimos, cumque illo voluptatum neque accusamus saepe et
                provident inventore tempore eius excepturi! Aspernatur, ratione
                suscipit possimus facere natus fugiat consequuntur?
              </p>

              <div className="buttons flex flex-col sm:flex-row gap-3 sm:gap-5 mt-8 sm:mt-10 mb-5 items-center sm:items-start justify-center lg:justify-start">
                <button className="w-full sm:w-auto bg-purple-700 text-white font-semibold px-6 py-2 rounded hover:bg-purple-900 transition-colors duration-300">
                  Read Online
                </button>
                {/* <button className="w-full sm:w-auto bg-purple-700 text-white font-semibold px-6 py-2 rounded hover:bg-purple-900 transition-colors duration-300">
                  Borrow
                </button> */}
                <button
                  onClick={() => setIsBorrowed(true)}
                  className={`w-full sm:w-32 text-white font-semibold px-6 py-2 rounded transition-colors duration-300 ${
                    isBorrowed
                      ? "bg-orange-600 hover:bg-orange-700 cursor-not-allowed"
                      : "bg-purple-700 hover:bg-purple-900"
                  }`}
                >
                  {isBorrowed ? "Borrowed" : "Borrow"}
                </button>

                {isBorrowed && (
                  <button
                    onClick={() => {
                      alert("Scan QR code to return!"); // Replace with actual return verification logic
                      setIsBorrowed(false); // Reset the borrowed state after verification
                    }}
                    className="w-full sm:w-auto bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700 transition-colors duration-300"
                  >
                    Verify Return
                  </button>
                )}
              </div>

              <hr className="border-white/20" />

              {/* ── fixed: table wraps tbody, horizontally scrollable on small screens ── */}
              <div className="mt-4 sm:mt-4">
                <table className="border-spacing-2 w-full min-w-120 text-sm sm:text-base">
                  <tbody>
                    <tr>
                      <td className="font-bold pr-4 pb-3">Language</td>
                      <td className="pb-3">English</td>
                      <td className="font-bold pl-6 sm:pl-10 pr-4 pb-3">
                        Publisher
                      </td>
                      <td className="pb-3">{bookDetails.bPublisher}</td>
                      <td rowSpan={3} className="pl-6 sm:pl-10 pr-4 pb-3">
                        {!bookDetails.bQR ? (
                          <div className="w-20 sm:w-32 h-30 flex items-center justify-center bg-white/20 rounded-lg">
                            <p className="text-white/70 text-xs sm:text-sm text-center">
                              QR code not available
                            </p>
                          </div>
                        ) : (
                          <div className="w-20 sm:w-32 h-auto">
                            <img
                              src={bookDetails.bQR}
                              alt="qr"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4 pb-3">Copies</td>
                      <td className="pb-3">{bookDetails.bQuantity}</td>
                      <td className="font-bold pl-6 sm:pl-10 pr-4 pb-3">
                        Published Year
                      </td>
                      <td className="pb-3">{bookDetails.bYear}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4 pb-3">Size/Pages</td>
                      <td className="pb-3">155MB / 1587pg</td>
                      <td className="font-bold pl-6 sm:pl-10 pr-4 pb-3">
                        ISBN
                      </td>
                      <td className="pb-3">{bookDetails.bISBN}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* reviews tab */}
          {activeTab === "reviews" && (
            <div
              id="reviews"
              className="reviewContent w-full h-auto lg:h-full px-2 sm:px-4 lg:pl-5 pt-3 text-white rounded-b-lg"
            >
              <div className="reviewmsgs relative h-full pb-24">
                {[1, 2].map((i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-start gap-3 sm:gap-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 border rounded-full overflow-hidden">
                        <img
                          src={testimg}
                          alt="reviewer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur maiores dolorem accusantium magnam
                        similique a aut optio reprehenderit eos? Unde provident
                        necessitatibus ipsa molestiae minima, placeat dolores
                        voluptatem sed! Voluptatum!
                      </p>
                    </div>
                    <div className="icons flex gap-4 justify-end items-center mt-2">
                      <img src={faceIcon} alt="emote" className="w-5 h-5" />
                      <img src={replyIcon} alt="reply" className="w-5 h-5" />
                      <img src={msgIcon} alt="msg" className="w-5 h-5" />
                    </div>
                  </div>
                ))}

                <div className="addcomment rounded-md border-2 border-white absolute bottom-2 sm:bottom-30 w-full h-10 flex items-center justify-between px-3 sm:px-4">
                  <input
                    type="text"
                    placeholder="Add your opinion here"
                    className="bg-transparent pb-2 pt-2 w-full text-sm sm:text-base focus:outline-none"
                  />
                  <button className="w-6 h-6 sm:w-7 sm:h-7 shrink-0">
                    <img src={sendIcon} alt="send" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* similar books tab */}
          {activeTab === "similar" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 w-full gap-3 sm:gap-2 h-auto lg:h-8/9 overflow-y-auto mt-10 lg:mt-15">
              {similarBooks.length > 0 ? (
                similarBooks.map((b) => (
                  <BookCard
                    key={b.bId}
                    book={b}
                    title={b.bTitle}
                    author={b.bAuthor}
                    availability={b.bStatus}
                    genre={b.bGenre}
                  />
                ))
              ) : (
                <p className="text-white/70 col-span-full text-center">
                  No similar books found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookView;
