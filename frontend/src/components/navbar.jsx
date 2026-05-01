import logo from "../images/testimg.jpg";

export function Navigation() {
  return (
    <div>
      <nav className="sticky top-0 bg-black h-16 z-50">
        <div className="nav max-w-7xl mx-auto px-4 ms:px-6 h-full flex items-center justify-between">
          <div className="logo flex object-container items-center overflow-hidden h-10 gap-10">
            <img src={logo} alt="myLogo" className="h-10 w-20 object-cover" />

            <ul className="nav-links hidden md:flex space-x-8 items-center text-white">
              <li className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                <a href="./modal.html">All books</a>
              </li>
              <li className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                <a href="#">New Arrivals</a>
              </li>

              <li className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          <div className="profile text-gray-300 text-md cursor-pointer hover:text-white transition-colors duration-300 flex gap-1 w-1/4">
            <input
              type="search"
              placeholder="   Search here"
              className="py-1 rounded bg-gray-200 text-black"
            />
            <input
              type="button"
              value="Login"
              name="login"
              className="w-1/3 rounded bg-blue-800 hover:bg-blue-900 transition-colors duration-300"
            />
          </div>
        </div>

        {/* for mobile view */}
        <div className="button">
          <button
            className="md:hidden text-gray-300 focus:outline-none"
            id="button"
          >
            <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-300"></span>
          </button>
          <div
            className="mobile hidden md:hidden bg-gray-200 px-4 py-4"
            id="mobileDiv"
          >
            <ul>
              <li>
                <a
                  href="#"
                  className="block py-2 text-blue-500 hover:text-black transition-colors duration-300"
                >
                  All Books
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 text-blue-500 hover:text-black transition-colors duration-300"
                >
                  New Arrivals
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block py-2 text-blue-500 hover:text-black transition-colors duration-300"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full bg-blue-100">
          <h2 className="font-bold font-sanserif text-center p-1 pb-2">
            Welcome Guest!
          </h2>
        </div>
      </nav>
    </div>
  );
}
