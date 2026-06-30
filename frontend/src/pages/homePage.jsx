import image from "../images/books3.jpg";
import step1 from "../images/icons/register.png";
import step2 from "../images/icons/brows.png";
import step3 from "../images/icons/qry.png";
import step4 from "../images/icons/repeat.png";
import newsLeft from "../images/newsLeft.jpg";
import pinned from "../images/icons/pin.png";
import bell from "../images/icons/bell.png";
import calendar from "../images/icons/calendar.png";
import arrowRight from "../images/icons/arrowRight.png";
// component for home page
import BookCard from "../components/Card.jsx";
import HeroSec from "../components/HeroSection.jsx";
import Navigation from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div>
        <HeroSec />
      </div>
      <div className="container w-full h-50 grid grid-cols-4 gap-2 px-4 ">
        <div className="  rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="img relative h-48 overflow-hidden rounded-xl">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-40"
            />
            <p className="absolute top-3 right-3 bg-purple-700 text-white py-1 px-3 rounded-full">
              10+ Veries
            </p>
            <span className="absolute bottom-3 left-3 z-10 font-medium text-lg text-purple-700  group-hover:text-purple-100 group-hover:bottom-20 transform-all duration-300 ">
              Search Catalogue
            </span>
            <p className="absolute bottom-4 left-3 opacity-0 group-hover:opacity-100 transform-opacity duration-300 bg-white/80 ">
              Find books, journals, and digital resources in one place
            </p>
            <div className="overlay w-full h-full bg-black object-cover absolute opacity-0 top-0 left-0 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
          </div>
        </div>
        <div className="  rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="img relative h-48 overflow-hidden rounded-xl">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-40"
            />
            <p className="absolute top-3 right-3 bg-blue-700 text-white py-1 px-3 rounded-full">
              2500+ Books
            </p>
            <span className="absolute bottom-3 left-3 z-10 font-medium text-lg text-blue-700  group-hover:text-purple-100 group-hover:bottom-20 transform-all duration-300 ">
              Book Collection
            </span>
            <p className="absolute bottom-4 left-3 opacity-0 group-hover:opacity-100 transform-opacity duration-300 bg-white/80 ">
              Explore our physical and digital library <br /> collections
            </p>
            <div className="overlay w-full h-full bg-black object-cover absolute opacity-0 top-0 left-0 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
          </div>
        </div>
        <div className="  rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="img relative h-48 overflow-hidden rounded-xl">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-40"
            />
            <p className="absolute top-3 right-3 bg-green-700 text-white py-1 px-3 rounded-full">
              22 available
            </p>
            <span className="absolute bottom-3 left-3 z-10 font-medium text-lg text-green-700  group-hover:text-green-100 group-hover:bottom-20 transform-all duration-300 ">
              Study Room
            </span>
            <p className="absolute bottom-4 left-3 opacity-0 group-hover:opacity-100 transform-opacity duration-300 bg-white/80 ">
              Reserve a quiet space for focused study or group work
            </p>
            <div className="overlay w-full h-full bg-black object-cover absolute opacity-0 top-0 left-0 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
          </div>
        </div>
        <div className="  rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="img relative h-48 overflow-hidden rounded-xl">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-40"
            />
            <p className="absolute top-3 right-3 bg-purple-700 text-white py-1 px-3 rounded-full">
              0 dues
            </p>
            <span className="absolute bottom-3 left-3 z-10 font-medium text-lg text-purple-700  group-hover:text-purple-100 group-hover:bottom-20 transform-all duration-300 ">
              Fine Details
            </span>
            <p className="absolute bottom-4 left-3 opacity-0 group-hover:opacity-100 transform-opacity duration-300 bg-white/80 ">
              Check and pay your outstanding <br />
              library fines
            </p>
            <div className="overlay w-full h-full bg-black object-cover absolute opacity-0 top-0 left-0 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
          </div>
        </div>
      </div>
      {/* ⁡⁣⁣⁢𝘤𝘢𝘳𝘥 𝘴𝘦𝘤𝘵𝘪𝘰𝘯 ⁡⁡*/}
      <div className="cards">
        <h1 className="text-purple-800 text-xl font-bold text-center mt-5">
          How to use the library?
        </h1>
        <p className="text-center text-gray-600 text-sm font-semibold">
          No paperwork, no manual entry, just scan and go.
        </p>
        {/* 𝘤𝘢𝘳𝘥 𝘴𝘦𝘵 */}
        <div className="cardSet w-full h-60 grid grid-cols-4 gap-4 px-4 mt-5">
          {/* ⁡⁣⁣⁢first card⁡ */}
          <div className="rounded-2xl flex flex-col items-center justify-center bg-purple-200 p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border-b-2 border-l-4 border-purple-300">
            <div className="img w-10 h-10 rounded-lg">
              <img
                src={step1}
                alt="Register Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="w-full text-center text-purple-600 font-semibold">
              Step 1
            </p>
            <h3 className="text-center text-lg font-bold">Register</h3>
            <p className="text-center text-sm text-gray-600">
              Create your library account in minutes. Admin involvement required
              for Registration.
            </p>
          </div>

          {/* ⁡⁣⁣⁡⁣⁣⁢𝘴𝘦𝘤𝘰𝘯𝘥 𝘤𝘢𝘳𝘥⁡⁡ */}
          <div className="rounded-2xl flex flex-col items-center justify-center bg-blue-200 p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border-b-2 border-l-4 border-blue-300">
            <div className="img w-10 h-10 rounded-lg">
              <img
                src={step2}
                alt="Browse Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="w-full text-center text-blue-600 font-semibold">
              Step 2
            </p>
            <h3 className="text-center text-lg font-bold">
              Browse the Catalog
            </h3>
            <p className="text-center text-sm text-gray-600">
              Search for books, journals, and digital resources in our catalog.
            </p>
          </div>

          {/* ⁡⁣⁣⁢𝘵𝘩𝘪𝘳𝘥 𝘤𝘢𝘳𝘥⁡ */}
          <div className="rounded-2xl flex flex-col items-center justify-center bg-green-200 p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border-b-2 border-l-4 border-green-300">
            <div className="img w-10 h-10 rounded-lg">
              <img
                src={step3}
                alt="Scan Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="w-full text-center text-green-600 font-semibold">
              Step 3
            </p>
            <h3 className="text-center text-lg font-bold">Scan and Borrow</h3>
            <p className="text-center text-sm text-gray-600">
              Use our easy-to-use scanning system to borrow books and other
              resources.
            </p>
          </div>

          {/* ⁡⁣⁣⁢𝘧𝘰𝘶𝘳𝘵𝘩 𝘤𝘢𝘳𝘥⁡ */}
          <div className="rounded-2xl flex flex-col items-center justify-center bg-purple-200 p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border-b-2 border-l-4 border-purple-300">
            <div className="img w-10 h-10 rounded-lg">
              <img
                src={step4}
                alt="Return Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="w-full text-center text-purple-600 font-semibold">
              Step 4
            </p>
            <h3 className="text-center text-lg font-bold">Return & Repeat</h3>
            <p className="text-center text-sm text-gray-600">
              Return borrowed items on time and continue exploring our
              collection.
            </p>
          </div>
        </div>
      </div>
      {/* ⁡⁣⁣⁢𝘤𝘢𝘳𝘥 𝘴𝘦𝘤𝘵𝘪𝘰𝘯⁡ ⁡⁡*/}
      <h1 className="text-purple-800 text-xl font-bold text-center mt-10 mb-5">
        Trending Books
      </h1>
      <div className="trendings grid grid-cols-6 gap-4 ">
        <BookCard />
        <BookCard />
        <BookCard />

        <BookCard />
        <BookCard />
        <BookCard />
      </div>
      {/* ⁡⁣⁣⁢announcements and news section⁡ */}
      <div className="topic flex items-center justify-center mt-10 mb-5 px-4">
        <h1 className="text-purple-800 text-xl font-bold text-center mt-5">
          Announcements & News
        </h1>
        <span className="bg-purple-700 text-white rounded-full text-xs font-medium py-1 px-3 italic">
          2 new
        </span>
      </div>
      <div className="announcements bg-purple-800 text-white rounded-lg p-4 mx-4">
        <div className="container w-full h-96  flex items-start justify-center gap-4 px-4">
          {/* ⁡⁣⁣⁢𝘯𝘦𝘸𝘴 𝘭𝘦𝘧𝘵 𝘥𝘪𝘷⁡ */}
          <div
            className="left w-1/2 h-full rounded-lg bg-white/20 border-l-4 border-b-2 border-white flex flex-col gap-4 hover:scale-110 transition-transform duration-300 z-10"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderColor: "rgba(167, 139, 250, 0.4)",
              borderTop: "1px solid rgba(255, 255, 255, 0.3)",
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 8px 32px rgba(80, 40, 160, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="img w-full h-1/2 rounded-t-lg overflow-hidden relative">
              <img
                src={newsLeft}
                alt="newly arrived images news"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-purple-700 text-white rounded-full text-xs font-medium py-1 px-3">
                <img
                  src={pinned}
                  alt="Pinned Icon"
                  className="w-4 h-4 inline-block mr-1"
                />
                Pinned
              </span>
            </div>
            <div className="text flex flex-col p-2">
              <span className=" bg-purple-200 text-purple-800 rounded-full text-xs w-36 font-medium py-1 px-3">
                <img
                  src={bell}
                  alt="Pinned Icon"
                  className="w-4 h-4 inline-block mr-1 my-0.5"
                />
                Announcement
              </span>
              <h3 className="text-lg font-bold mt-2">
                45 new books added across 6 genres this week
              </h3>
              <p className="text-sm text-gray-200 mt-1 mb-2.5">
                Our library has expanded its collection with 45 new books across
                6 genres, including fiction, non-fiction, science, history, and
                more. Explore the latest additions and discover your next great
                read!
              </p>
              <hr></hr>

              <div className="flex justify-between px-2 items-center">
                <span className="p-4 text-xs text-gray-300">
                  <img
                    src={calendar}
                    alt="calendar Icon"
                    className="w-4 h-4 inline-block mr-1 mb-1"
                  />
                  3rd June 2026
                </span>
                <span className="p-4 text-sm cursor-pointer text-white align-self-end hover:underline">
                  <img
                    src={arrowRight}
                    alt="calendar Icon"
                    className="w-4 h-4 inline-block mr-1 mb-1"
                  />
                  Read More
                </span>
              </div>
            </div>
          </div>
          <div className="right w-1/2 h-full rounded-lg flex flex-col gap-2">
            {/* ⁡⁣⁣⁢news right top div⁡ */}
            <div
              className="rtop w-full h-1/2 rounded-lg border-2 bg-white/20 border-l-4 border-b-2 border-white flex hover:scale-110 transition-transform duration-300 hover:z-20"
              style={{
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderColor: "rgba(167, 139, 250, 0.4)",
                borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow:
                  "0 8px 32px rgba(80, 40, 160, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="img w-1/4  rounded-l-lg h-full relative overflow-hidden">
                <img
                  src={newsLeft}
                  alt="newly arrived images news"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-700 text-red-300 rounded-full text-xs font-medium py-1 px-3">
                  <img
                    src={pinned}
                    alt="Pinned Icon"
                    className="w-4 h-4 inline-block mr-1"
                  />
                  Alert
                </span>
              </div>
              <div className="text w-3/4 h-full p-2">
                <h3 className="text-lg font-bold mt-2">
                  System maintanance - June 5, 2.00pm-8.00pm
                </h3>
                <p className="text-sm text-gray-200 mt-1 mb-2.5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, at. repudiandae! nostrum, tenetur fugiat accusantium?
                </p>

                <hr />

                <div className="flex justify-between px-2 items-center">
                  <span className="p-4 text-xs text-gray-300">
                    <img
                      src={calendar}
                      alt="calendar Icon"
                      className="w-4 h-4 inline-block mr-1 mb-1"
                    />
                    3rd June 2026
                  </span>
                  <span className="p-4 text-sm cursor-pointer text-white align-self-end hover:underline">
                    <img
                      src={arrowRight}
                      alt="calendar Icon"
                      className="w-4 h-4 inline-block mr-1 mb-1"
                    />
                    Details
                  </span>
                </div>
              </div>
            </div>
            <div
              className="rbottom w-full h-1/2 rounded-lg border-2 bg-white/20 border-l-4 border-b-2 border-white flex hover:scale-110 transition-transform duration-300 hover:z-20"
              style={{
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderColor: "rgba(167, 139, 250, 0.4)",
                borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow:
                  "0 8px 32px rgba(80, 40, 160, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="img w-1/4 rounded-l-lg h-full relative overflow-hidden">
                <img
                  src={newsLeft}
                  alt="newly arrived images news"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-green-700 text-green-300 rounded-full text-xs font-medium py-1 px-3">
                  <img
                    src={pinned}
                    alt="Pinned Icon"
                    className="w-4 h-4 inline-block mr-1"
                  />
                  Update
                </span>
              </div>
              <div className="text w-3/4 h-full p-2">
                <h3 className="text-lg font-bold mt-2">
                  QR scan for quick return process
                </h3>
                <p className="text-sm text-gray-200 mt-1 mb-2.5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, at. repudiandae! nostrum, tenetur fugiat accusantium?
                </p>

                <hr />

                <div className="flex justify-between px-2 items-center">
                  <span className="p-4 text-xs text-gray-300">
                    <img
                      src={calendar}
                      alt="calendar Icon"
                      className="w-4 h-4 inline-block mr-1 mb-1"
                    />
                    4rd June 2026
                  </span>
                  <span className="p-4 text-sm cursor-pointer text-white align-self-end hover:underline">
                    <img
                      src={arrowRight}
                      alt="calendar Icon"
                      className="w-4 h-4 inline-block mr-1 mb-1"
                    />
                    Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
