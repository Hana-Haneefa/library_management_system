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
            <span className="absolute bottom-3 left-3 z-10 font-medium text-lg text-blue-700">
              Search Catalogue
            </span>
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
            <span className="absolute bottom-3 left-3 z-10 font-medium text-lg text-blue-700">
              Book Collection
            </span>
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
            <span className="absolute bottom-3 left-3 z-10 font-medium text-lg text-blue-700">
              Study Room
            </span>
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
            <span className="absolute bottom-3 left-3 z-10 font-medium text-lg text-blue-700">
              Fine Details
            </span>
            <div className="overlay w-full h-full bg-black object-cover absolute opacity-0 top-0 left-0 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
