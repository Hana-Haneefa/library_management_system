import logo from "../images/testimg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  return (
    <div className="footer w-full mt-10 text-white flex flex-col">
      <div className="up flex flex-col md:flex-row md:justify-around items-center justify-center text-center md:text-left gap-0.5 bg-black">
        <div className="sec1 flex items-center gap-2 flex-col">
          <img src={logo} alt="logo" className="w-56 h-full" />
          <h1 className="text-4xl font-serif mb-3">BOOKIE</h1>
        </div>

        <div className="sec2">
          <h1 className="text-xl font-semibold mb-5">Quick Links</h1>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="#" className="hover:text-blue-300">
                All books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Authors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Most famous
              </a>
            </li>
          </ul>
        </div>
        <div className="sec3 mt-4 md:mt-0 ">
          <h1 className="text-xl font-semibold mb-5 ">Explore</h1>
          <ul className="flex flex-col gap-5">
            <li>
              <a href="#" className="hover:text-blue-300">
                Fictional
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Non-Fictional
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Educational
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Short Stories
              </a>
            </li>
          </ul>
        </div>

        <div className="sec4 mt-4 md:mt-0">
          <h1 className="text-xl font-semibold mb-5">Contact Us</h1>
          <ul className="flex flex-col ">
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>bookie@gmail.com</span>
            </span>
            <br />
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>bookie@gmail.com</span>
            </span>
            <br />
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>bookie@gmail.com</span>
            </span>
            <br />
          </ul>
        </div>
      </div>
      <div className="down bg-blue-900 text-center pb-4">
        <p className="text-center text-sm mt-4">All rights reserved.</p>
      </div>
    </div>
  );
}
