import icon from "../../images/icons/heart.png";
import { useState, useRef, useEffect } from "react";

function DashboardSec() {
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;

    content.style.opacity = "0";
    content.style.transform = "translateY(50px)";

    requestAnimationFrame(() => {
      setTimeout(() => {
        content.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      }, 1500);
    });
  }, []);
  return (
    <div ref={contentRef}>
      {/* filters */}
      <div className="settings w-full h-auto flex px-4 py-2 text-white/70 justify-between">
        <div className="setLeft flex gap-8">
          <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
            Table
          </button>
          <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
            Graph
          </button>
          <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
            Charts
          </button>
        </div>
        <div className="setRight flex gap-8">
          <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
            Filter
          </button>
          <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
            <input
              type="search"
              placeholder="Search..."
              className="bg-transparent focus:outline-none pb-1 pl-2"
            />
            Search
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="cards w-full h-50 grid grid-cols-4 gap-4">
        {[
          "Total Books",
          "Total Members",
          "Active Borrows",
          "Pending Fines",
        ].map((title, i) => (
          <div
            key={i}
            className="h-full w-auto bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group"
          >
            <div className="icon w-15 h-15 rounded-full absolute top-4 right-4 bg-white/30 border-2 border-white shadow-md shadow-gray-800">
              <img
                src={icon}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="content p-4">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="text-3xl font-bold text-white">1,234</p>
            </div>
            <span className="absolute bottom-2 right-4 text-xs text-white/70">
              +5% from last month
            </span>
            <span className="absolute bottom-2 left-4 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Read more
            </span>
          </div>
        ))}
      </div>

      {/* graphs */}
      <div className="graphs flex h-auto gap-4 mt-2">
        <div className="w-2/3 h-full bg-white/20 rounded-2xl border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg"></div>
        <div className="w-1/3 h-full bg-white/20 rounded-2xl border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg"></div>
      </div>
    </div>
  );
}

export default DashboardSec;
