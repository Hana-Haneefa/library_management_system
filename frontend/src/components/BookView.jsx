import { useState } from "react";
import testimg from "../images/testimg.jpg";
import bookimg from "../images/book1.jpg";

function BookView() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="hero w-full min-h-screen flex items-center justify-center py-10">
      <div className="container w-full lg:w-4/5 h-full flex flex-col lg:flex-row">
        {/* LEFT: Book Image */}
        <div className="left w-full h-64 lg:w-1/3 lg:h-full py-4 lg:py-0 overflow-hidden flex justify-center items-center">
          <img
            src={bookimg}
            alt="book img"
            className="book-img w-full h-full object-contain lg:ml-2"
          />
        </div>

        {/* RIGHT */}
        <div className="right w-full lg:w-2/3 p-5 overflow-hidden flex justify-center items-center flex-col">
          {/* Tab Buttons */}
          <div className="tabs w-full flex gap-4 text-white font-bold sm:text-lg pl-5 bg-white bg-opacity-20 h-10 rounded-t-lg border-b-2 items-center">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`tab-btn hover:text-red-400 transition-colors duration-200 ${
                activeTab === "details" ? "text-red-400" : ""
              }`}
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`tab-btn hover:text-red-400 transition-colors duration-200 ${
                activeTab === "reviews" ? "text-red-400" : ""
              }`}
            >
              Reviews
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("related")}
              className={`tab-btn hover:text-red-400 transition-colors duration-200 ${
                activeTab === "related" ? "text-red-400" : ""
              }`}
            >
              Related Books
            </button>
          </div>

          <div className="flex h-full w-full flex-col lg:flex-row">
            {/* DETAILS TAB  */}
            {activeTab === "details" && (
              <div
                id="details"
                className="tab-content w-full lg:w-2/3 h-auto lg:h-full bg-white bg-opacity-20 p-2 md:pl-5 pt-3 text-white rounded-b-lg overflow-y-auto"
              >
                <h1 className="text-3xl font-serif font-bold">Book Name</h1>
                <p className="font-semibold">
                  By
                  <a href="#author profile" className="underline">
                    Author name
                  </a>
                </p>
                <div className="star mt-1 text-sm mb-10">
                  {/* <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i> */}
                </div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Illum dignissimos, cumque illo voluptatum neque accusamus
                  saepe et provident inventore tempore eius excepturi!
                  Aspernatur, ratione suscipit possimus facere natus fugiat
                  consequuntur?
                </p>

                <div className="buttons flex gap-5 mt-10 mb-5 items-center justify-center lg:justify-start">
                  <button className="bg-red-700 text-white font-semibold px-6 py-2 mb-5 rounded hover:bg-red-900 transition-colors duration-300">
                    Read Online
                  </button>
                  <button className="bg-red-700 text-white font-semibold px-6 py-2 mb-5 rounded hover:bg-red-900 transition-colors duration-300">
                    Listen
                  </button>
                </div>

                <hr />

                <div className="mt-10 overflow-x-auto pb-4">
                  <table className="border-spacing-2">
                    <tbody>
                      <tr>
                        <td className="font-bold pr-4 pb-3">Language</td>
                        <td className="pb-3">English</td>
                        <td className="font-bold pl-10 pr-4 pb-3">Publisher</td>
                        <td className="pb-3">Author name</td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-4 pb-3">Quality</td>
                        <td className="pb-3">Pages</td>
                        <td className="font-bold pl-10 pr-4 pb-3">
                          Published Date
                        </td>
                        <td className="pb-3">2017/05</td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-4 pb-3">Size/Pages</td>
                        <td className="pb-3">155MB / 1587pg</td>
                        <td className="font-bold pl-10 pr-4 pb-3">Index</td>
                        <td className="pb-3">5466685jk669</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* REVIEWS TAB  */}
            {activeTab === "reviews" && (
              <div
                id="reviews"
                className="tab-content w-full lg:w-2/3 h-auto lg:h-full bg-white bg-opacity-20 px-4 lg:pl-5 pt-3 text-white rounded-b-lg"
              >
                <div className="reviewmsgs relative h-full pb-20">
                  <div className="flex justify-between items-start gap-5">
                    <img
                      src={testimg}
                      alt="review profile1"
                      className="w-10 h-auto rounded-full"
                    />
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur maiores dolorem accusantium magnam similique
                      a aut optio reprehenderit eos? Unde provident
                      necessitatibus ipsa molestiae minima, placeat dolores
                      voluptatem sed! Voluptatum!
                    </p>
                  </div>
                  <div className="icons flex gap-4 justify-end items-center">
                    {/* <i className="fa-regular fa-face-smile"></i>
                    <i className="fa-solid fa-reply"></i>
                    <i className="fa-regular fa-message"></i> */}
                  </div>
                  <div className="flex justify-between items-start gap-5 mt-5">
                    <img
                      src={testimg}
                      alt="review profile1"
                      className="w-10 h-auto rounded-full"
                    />
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur maiores dolorem accusantium magnam similique
                      a aut optio reprehenderit eos? Unde provident
                      necessitatibus ipsa molestiae minima, placeat dolores
                      voluptatem sed! Voluptatum!
                    </p>
                  </div>
                  <div className="icons flex gap-4 justify-end items-center">
                    {/* <i className="fa-regular fa-face-smile"></i>
                    <i className="fa-solid fa-reply"></i>
                    <i className="fa-regular fa-message"></i> */}
                  </div>

                  <div className="addcomment rounded-md border-2 border-white absolute bottom-5 md:bottom-16 w-full h-10 flex flex-1 justify-between px-4">
                    <input
                      type="text"
                      placeholder="Add your opinion here"
                      className="bg-transparent pb-2 pt-2 w-full focus:outline-none"
                    />
                    <button>
                      {/* <i className="fa-solid fa-angle-up"></i> */}Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* RELATED BOOKS TAB  */}
            {activeTab === "related" && (
              <div
                id="related"
                className="tab-content w-full lg:w-2/3 h-auto lg:h-full bg-white bg-opacity-20 lg:px-5 pt-3 px-3 md:px-4 text-white rounded-b-lg pb-4"
              >
                <div className="flex items-center justify-center h-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-3 md:gap-5 w-2/3 md:w-full">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="shadow-lg relative group rounded-md overflow-hidden"
                      >
                        <img
                          src={bookimg}
                          alt="related book"
                          className="w-full h-full object-cover"
                        />
                        <div className="buttons absolute w-full bottom-0 left-0 px-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <button className="bg-red-700 text-white text-xs md:text-base font-semibold px-6 py-2 mb-3 rounded hover:bg-red-900 transition-colors duration-300 w-full">
                            View More
                          </button>
                          <button className="bg-red-700 text-white text-xs md:text-base font-semibold px-6 py-2 mb-2 rounded hover:bg-red-900 transition-colors duration-300 w-full">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookView;
