import hero from "../images/hero-bg.jpg";
import book1 from "../images/book1.jpg";
import book2 from "../images/book2.jpg";
import book3 from "../images/book3.jpg";
import { useState, useEffect } from "react";

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
      <div className="container w-full h-100">
        <img
          src={hero}
          alt="hero-background-image"
          className="w-full h-full overflow-hidden object-cover relative"
        />
        <div className="left w-full mx-2 h-1/2 absolute top-4 left-0 bg-gradient-to-r from-black/80 to-black/0 p-2">
          <div className="book w-2/3 h-full flex gap-10 ">
            <div className="img w-fit h-full overflow-hidden rounded-tl-2xl rounded-br-2xl">
              <img
                src={slides[current].imgUrl}
                alt="book-1"
                className="w-full h-full object-contain overflow-hidden"
              />
            </div>
            <div className="text w-1/2 h-full overflow-hidden flex items-center justify-center pr-2">
              <h3 className="font-semibold text-3xl text-white font-sans">
                {slides[current].text}
              </h3>
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
