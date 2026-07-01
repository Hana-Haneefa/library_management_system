import { useState } from "react";
import bookImg from "../images/book1nobg.png";
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
// component
import BookCard from "../components/Card.jsx";

function BookView() {
  const [activeTab, setActiveTab] = useState("info");
  return (
    <div className="w-full h-screen flex relative">
      {/* ⁡⁣⁣⁢𝘭𝘦𝘧𝘵 𝘤𝘰𝘭𝘰𝘳 𝘭𝘪𝘯𝘦⁡ */}
      <div className="left w-1/6 bg-purple-300"></div>
      {/* ⁡⁣⁣⁢𝘳𝘪𝘨𝘩𝘵 𝘴𝘪𝘥𝘦 𝘱𝘢𝘳𝘵⁡ */}
      <div className="right w-5/6 bg-black"></div>
      {/* ⁡⁣⁣⁢𝘮𝘪𝘥𝘥𝘭𝘦 𝘤𝘰𝘯𝘵𝘦𝘯𝘵⁡ */}
      <div className="mid w-5/6 h-5/6 absolute top-15 left-35 border-t-2 border-r-2 border-white/30 shadow-lg rounded-2xl bg-white/20 backdrop-blur-lg flex p-5 gap-2">
        <div className="leftBookimg w-2/4 h-full">
          <div className="img w-full h-7/8">
            <img
              src={bookImg}
              alt="book image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="availabelIcons flex gap-4 items-center justify-start pl-5 font-semibold text-white">
            <p>Available for: </p>
            <button className="w-8 h-8 p-1 rounded-md  overflow-hidden">
              <img
                src={readIcon}
                alt="listen icon"
                className="w-full h-full object-cover"
              />
            </button>
            <button className="w-8 h-8 p-1 rounded-md overflow-hidden">
              <img
                src={eyeIcon}
                alt="listen icon"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
        {/* right side of middle div */}
        <div className="rightDetails w-3/4 h-full">
          {/* ⁡⁣⁣⁢𝘵𝘢𝘣 𝘣𝘶𝘵𝘵𝘰𝘯𝘴⁡ */}
          <div className="flex gap-2 border-b border-white/30 mb-6">
            <button
              onClick={() => setActiveTab("info")}
              className={`px-6 py-2 font-semibold transition-all duration-300
        ${
          activeTab === "info"
            ? "border-b-2 border-purple-400 text-purple-400"
            : "text-white/50 hover:text-white"
        }`}
            >
              Info
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-2 font-semibold transition-all duration-300
        ${
          activeTab === "reviews"
            ? "border-b-2 border-purple-400 text-purple-400"
            : "text-white/50 hover:text-white"
        }`}
            >
              Review
            </button>
            <button
              onClick={() => setActiveTab("similar")}
              className={`px-6 py-2 font-semibold transition-all duration-300
        ${
          activeTab === "similar"
            ? "border-b-2 border-purple-400 text-purple-400"
            : "text-white/50 hover:text-white"
        }`}
            >
              Similar Books
            </button>
          </div>

          {/* 𝘥𝘪𝘷 𝘤𝘰𝘯𝘵𝘦𝘯𝘵𝘴 */}
          {activeTab === "info" && (
            <div
              id="info"
              className="infoContent w-full lg:w-full h-auto lg:h-full bg-opacity-20 p-2 md:pl-5 pt-3 text-white rounded-b-lg overflow-y-auto"
            >
              <h1 className="text-3xl font-serif font-bold">Book Name</h1>
              <p className="font-semibold">
                By
                <a href="#author profile" className="underline pl-2">
                  Author name
                </a>
              </p>
              <div className="star mt-1 text-sm mb-10 flex gap-1">
                <img src={starFill} alt="star icon" className="w-5 h-5" />
                <img src={starFill} alt="star icon" className="w-5 h-5" />
                <img src={starFill} alt="star icon" className="w-5 h-5" />
                <img src={star} alt="star icon" className="w-5 h-5" />
                <img src={star} alt="star icon" className="w-5 h-5" />
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
                dignissimos, cumque illo voluptatum neque accusamus saepe et
                provident inventore tempore eius excepturi! Aspernatur, ratione
                suscipit possimus facere natus fugiat consequuntur?
              </p>

              <div className="buttons flex gap-5 mt-10 mb-5 items-center justify-center lg:justify-start">
                <button className="bg-purple-700 text-white font-semibold px-6 py-2 mb-5 rounded hover:bg-purple-900 transition-colors duration-300">
                  Read Online
                </button>
                <button className="bg-purple-700 text-white font-semibold px-6 py-2 mb-5 rounded hover:bg-purple-900 transition-colors duration-300">
                  Borrow
                </button>
              </div>

              <hr />

              <div className="mt-10 overflow-x-auto pb-4">
                <table className="border-spacing-2  w-full">
                  <tr>
                    <td className="font-bold pr-4 pb-3">Language</td>
                    <td className="pb-3">English</td>
                    <td className="font-bold pl-10 pr-4 pb-3">Publisher</td>
                    <td className="pb-3">Author name</td>
                    <td rowSpan={3}>
                      <div className="w-32 h-auto">
                        <img
                          src={qr}
                          alt="qr image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-3">Copies</td>
                    <td className="pb-3">8/10</td>
                    <td className="font-bold pl-10 pr-4 pb-3">
                      Published Date
                    </td>
                    <td className="pb-3">2017/05</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-3">Size/Pages</td>
                    <td className="pb-3">155MB / 1587pg</td>
                    <td className="font-bold pl-10 pr-4 pb-3">Index</td>
                    <td className="pb-3">5466685jk669</td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div
              id="reviews"
              className="reviewContent w-full lg:w-full h-auto lg:h-full bg-opacity-20 px-4 lg:pl-5 pt-3 text-white rounded-b-lg"
            >
              <div className="reviewmsgs relative h-full pb-20">
                <div className="flex justify-between items-start gap-5">
                  <div className="w-1/12 h-14 border rounded-full overflow-hidden">
                    <img
                      src={testimg}
                      alt="review profile1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm w-9/10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur maiores dolorem accusantium magnam similique a
                    aut optio reprehenderit eos? Unde provident necessitatibus
                    ipsa molestiae minima, placeat dolores voluptatem sed!
                    Voluptatum!
                  </p>
                </div>
                <div className="icons flex gap-4 justify-end items-center mb-5">
                  <img src={faceIcon} alt="emote icon" className="w-5 h-5" />
                  <img src={replyIcon} alt="reply icon" className="w-5 h-5" />
                  <img src={msgIcon} alt="msg icon" className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-start gap-5">
                  <div className="w-1/12 h-14 border rounded-full overflow-hidden">
                    <img
                      src={testimg}
                      alt="review profile1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm w-9/10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur maiores dolorem accusantium magnam similique a
                    aut optio reprehenderit eos? Unde provident necessitatibus
                    ipsa molestiae minima, placeat dolores voluptatem sed!
                    Voluptatum!
                  </p>
                </div>
                <div className="icons flex gap-4 justify-end items-center">
                  <img src={faceIcon} alt="emote icon" className="w-5 h-5" />
                  <img src={replyIcon} alt="reply icon" className="w-5 h-5" />
                  <img src={msgIcon} alt="msg icon" className="w-5 h-5" />
                </div>

                <div className="addcomment rounded-md border-2 border-white absolute bottom-5 md:bottom-16 w-full h-10 flex flex-1 items-center justify-between px-4">
                  <input
                    type="text"
                    placeholder="Add your opinion here"
                    className="bg-transparent pb-2 pt-2 w-full focus:outline-none"
                  />
                  <button className="w-7 h-7">
                    <img src={sendIcon} alt="send msg icon" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "similar" && (
            <div className="grid grid-cols-3 w-full gap-2 h-8/9 border-white overflow-y-auto mt-15">
              <BookCard />
              <BookCard />
              <BookCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookView;
