import Nav from "../components/Navbar.jsx";
import BookCard from "../components/Card.jsx";
import arrowIcon from "../images/icons/arrowRight.png";
function CategoryPage() {
  return (
    <div>
      <Nav />

      <p className="flex">
        Home <img src={arrowIcon} className="w-4 h-4" /> Categories{" "}
        <img src={arrowIcon} className="w-4 h-4" /> Cyber Security
      </p>
      <div className="content w-full flex flex-col items-end pt-4 gap-5">
        <div className="title w-5/10 h-20 rounded-l-full bg-purple-900 flex flex-col justify-center items-start pl-10 shadow-lg shadow-purple-400">
          <h1 className="text-3xl text-white font-semibold font-serif">
            Cyber Security
          </h1>
        </div>
        <div className="flex gap-3 w-5/12 flex-1 pr-4">
          <button className="border-2 border-purple-800 py-2 px-4 rounded-md bg-white/40 text-purple-800 font-semibold hover:text-white hover:bg-purple-800 transition-colors duration-300 cursor-pointer ml-0.5">
            Filter
          </button>
          <button className="border-2 border-purple-800 py-2 px-4 rounded-md bg-white/40 text-purple-800 font-semibold hover:text-white hover:bg-purple-800 transition-colors duration-300 cursor-pointer ml-0.5">
            Sort
          </button>
          <input
            type="text"
            placeholder="Search books by Title, Author, ISBN or Genre..."
            className="border-2 border-purple-800 w-full py-2 px-4 rounded-md bg-white/40 text-purple-800 font-semibold  cursor-text ml-0.5"
          />
          {/* books */}
        </div>
        <div className="w-full grid lg:grid-cols-6 gap-10 mt-2 p-4">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
