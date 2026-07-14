import logo from "../images/testimg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  return (
    <div className="footer w-full mt-10 text-white flex flex-col">
      <div className="up grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 rounded-2xl shadow-xl shadow-purple-900/40 m-4 pt-8 pb-0 overflow-hidden text-center md:text-left text-white">
        <div className="sec1 flex items-center gap-2 flex-col pb-4">
          <img src={logo} alt="logo" className="w-40 h-auto" />
          <h1 className="text-4xl font-serif mb-3">BOOKIE</h1>
        </div>

        <div className="sec2">
          <h1 className="text-xl font-semibold mb-5">Quick Links</h1>
          <ul className="flex flex-col gap-4 ">
            <li>
              <a href="#" className="hover:text-purple-300">
                All books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-300">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-300">
                Authors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-300">
                Most famous
              </a>
            </li>
          </ul>
        </div>

        <div className="sec3">
          <h1 className="text-xl font-semibold mb-5">Explore</h1>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="#" className="hover:text-purple-300">
                Fictional
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-300">
                Non-Fictional
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-300">
                Educational
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-300">
                Short Stories
              </a>
            </li>
          </ul>
        </div>

        <div className="sec4">
          <h1 className="text-xl font-semibold mb-5">Contact Us</h1>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>bookie@gmail.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>bookie@gmail.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>bookie@gmail.com</span>
            </li>
          </ul>
        </div>
        <div className="bg-purple-950 text-center text-white/70 py-4 w-full col-span-full border-t border-white/10">
          <p className="text-sm">© 2026 <span className="font-bold text-white">BOOKIE</span>. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
