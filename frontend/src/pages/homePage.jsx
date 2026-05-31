import image from "../images/books3.jpg";
import step1 from "../images/icons/register.png";
import step2 from "../images/icons/brows.png";
import step3 from "../images/icons/qry.png";
import step4 from "../images/icons/repeat.png";
// component for home page
import BookCard from "../components/Card.jsx";

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
            <div className="img w-15 h-15 rounded-lg">
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
            <div className="img w-15 h-15 rounded-lg">
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
            <div className="img w-15 h-15 rounded-lg">
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
            <div className="img w-15 h-15 rounded-lg">
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
      <h1 class="text-purple-800 text-xl font-bold text-center mt-10 mb-5">
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
    </div>
  );
}

export default HomePage;
