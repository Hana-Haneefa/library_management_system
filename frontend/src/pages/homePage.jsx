import image from "../images/books3.jpg";

function HomePage() {
  return (
    <div className="mt-10">
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
      <div className="cards">
        <h1 className="text-purple-800 text-xl font-bold text-center">
          How to use the library?
        </h1>
        <p>No paperwork, no manual entry, just scan and go.</p>
      </div>
    </div>
  );
}

export default HomePage;
