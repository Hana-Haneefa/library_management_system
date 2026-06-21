import bookimg from "../images/book1nobg.png";
import qrcode from "../images/icons/qrcode.png";
import viewIcon from "../images/icons/viewIcon.png";
import favourite from "../images/icons/heart.png";
import favSelected from "../images/icons/heartSelected.png";
import { useState, useEffect } from "react";

function BookCard({
  imageSrc,
  title,
  author,
  availability,
  genre,
  className = "",
}) {
  const [isFav, setIsFav] = useState(false);
  const [label, setLabel] = useState("Read");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); //fade out

      setTimeout(() => {
        setLabel((prev) => (prev === "Read" ? "Borrow" : "Read"));
        setVisible(true); // then fade in
      }, 300); //text change + fade in
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  function toggleFav() {
    setIsFav(!isFav);
  }
  return (
    <div
      className={`bookCard ${className || "w-50 h-72"} w-50 h-72 mx-5 relative group overflow-hidden rounded-md`}
    >
      {/* image div */}
      <img
        src={imageSrc || bookimg}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        alt=""
      />

      {/* text div */}
      <div className="absolute bottom-0 left-0 w-full bg-white/90 rounded-t-2xl translate-y-0 group-hover:translate-y-full opacity-100 group-hover:opacity-0 transition-all duration-500 p-2 flex flex-col items-center justify-between gap-1">
        <h3 className="text-lg font-bold">The Great Gatsby</h3>
        <p className="text-sm text-gray-600">by F. Scott Fitzgerald</p>
        <button className="bg-purple-800 w-full py-2 px-4 rounded-md text-white font-semibold hover:bg-purple-600 transition-colors duration-300">
          <span
            style={{
              display: "inline-block",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.3s ease",
            }}
          >
            {label}
          </span>
        </button>
        <span className="text-green-600 font-semibold text-xs">Available</span>
      </div>

      {/* genre badge */}
      <div className="absolute top-2 left-2 pb-1 px-3 bg-purple-700 text-white rounded-full text-xs font-medium">
        <p className="italic">Science</p>
      </div>
      <div className="quickAccess flex flex-col absolute top-2 right-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="qr w-7 h-7 hover:cursor-pointer rounded-lg flex items-center justify-center">
          <img src={qrcode} alt="QR Code" />
        </div>
        <div className="viewIcon w-7 h-7 hover:cursor-pointer rounded-lg flex items-center justify-center">
          <img src={viewIcon} alt="View Icon" />
        </div>
        <div className="favourite w-7 h-7 hover:cursor-pointer rounded-lg flex items-center justify-center">
          <img
            src={isFav ? favSelected : favourite}
            alt="Favourite Icon"
            onClick={toggleFav}
          />
        </div>
      </div>
      <div className="btn opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-11/12">
        <button className="border-2 border-purple-800 w-full py-2 px-4 rounded-md bg-white/40 text-purple-800 font-semibold hover:text-purple-600 transition-colors duration-300 cursor-pointer ml-0.5">
          <span
            style={{
              display: "inline-block",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.3s ease",
            }}
          >
            {label}
          </span>
        </button>
      </div>
    </div>
  );
}

export default BookCard;
