import hero from "../images/bg-hero2.jpg";
import book1 from "../images/booknobg.png";
import book3 from "../images/booknobg.png";
import book2 from "../images/booknobg.png";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    imgUrl: book1,
    text: "'Expand your mind with our vast collection of knowledge. From science to history, find the resources that fuel your growth.'",
  },
  {
    imgUrl: book2,
    text: "'Your gateway to knowledge. Explore thousands of educational books, journals, and references. All in one place.'",
  },
  {
    imgUrl: book3,
    text: "'Knowledge is power. Discover our carefully curated collection of books designed to inform, educate, and inspire.'",
  },
];

function HeroSec() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="container w-full h-150 relative flex">
        <img
          src={hero}
          alt="hero-background-image"
          className="w-full h-full overflow-hidden object-cover relative"
        />
        <div className="left w-full mx-2 h-140 absolute bottom-5 left-0 bg-linear-to-r from-black/80 to-black/0 p-4">
          <div className="book w-2/3 h-full flex gap-10 ">
            <div className="img w-1/2 h-full overflow-hidden shadow-md rounded-bl-4xl rounded-tr-4xl bg-white/10">
              <img
                src={slides[current].imgUrl}
                alt="book-1"
                className="w-full h-full object-cover overflow-hidden hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="text w-1/2 h-full overflow-hidden flex flex-col items-center justify-center p-4 ">
              <h3 className="font-semibold text-3xl text-white font-sans">
                {slides[current].text}
              </h3>
              <input
                type="search"
                placeholder=" Seek Knowledge.."
                name="search"
                className="w-full h-10 px-4 rounded-xl bg-white mt-5 focus-within:outline-none hover:focus-within:ring-2 hover:focus-within:ring-purple-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="slide-buttons w-full h-10 text-white flex justify-center items-center px-2 shadow-md">
        {/* dot indicators */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                i === current ? "bg-gray-700" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSec;
