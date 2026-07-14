import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";

import BookCard from "../components/Card.jsx";
import Navigation from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { COVER_BASE_URL } from "../context/authContext.jsx";

/* ─── Debounce hook ─── */
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const SORT_OPTIONS = [
  { value: "title_asc", label: "Title, A–Z" },
  { value: "title_desc", label: "Title, Z–A" },
  { value: "author_asc", label: "Author, A–Z" },
  { value: "newest", label: "Recently Added" },
];

const PAGE_SIZE = 18;

function AllBooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || "allGenres",
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "title_asc");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [availableGenres, setAvailableGenres] = useState([]);
  const [pagination, setPagination] = useState(null);

  const debouncedQuery = useDebounce(searchQuery);

  //____________fetch genre list once_____________
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await api.get("/api/books/genres");
        if (res.data.success) setAvailableGenres(res.data.data);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenres();
  }, []);

  //____________keep the URL in sync with filters, so the page is shareable/bookmarkable_____________
  useEffect(() => {
    const params = {};
    if (debouncedQuery) params.query = debouncedQuery;
    if (selectedGenre !== "allGenres") params.genre = selectedGenre;
    if (sortBy !== "title_asc") params.sort = sortBy;
    if (page !== 1) params.page = page;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, selectedGenre, sortBy, page]);

  //____________reset to page 1 whenever filters change (not when page itself changes)_____________
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, selectedGenre, sortBy]);

  //____________fetch books_____________
  useEffect(() => {
    const searchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = { page, limit: PAGE_SIZE, sort: sortBy };
        if (debouncedQuery) params.query = debouncedQuery;
        if (selectedGenre !== "allGenres") params.genre = selectedGenre;

        const res = await api.get("/api/books/search", {
          params,
          headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });

        if (res.data.success) {
          setBooks(res.data.data);
          setPagination(res.data.pagination);
        } else {
          setError(res.data.msg || "Failed to load books");
        }
      } catch (err) {
        console.error("Error searching books:", err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    searchBooks();
  }, [debouncedQuery, selectedGenre, sortBy, page]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("allGenres");
    setSortBy("title_asc");
    setPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedGenre !== "allGenres" ||
    sortBy !== "title_asc";

  // build a compact page-number list with ellipses for large ranges
  const getPageNumbers = () => {
    if (!pagination) return [];
    const total = pagination.pages;
    const current = pagination.page;
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let last = null;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }
    for (const i of range) {
      if (last !== null) {
        if (i - last === 2) rangeWithDots.push(last + 1);
        else if (i - last > 2) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      last = i;
    }
    return rangeWithDots;
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <Navigation />

      {/* ══════════════════════════════════════
          CATALOG HEADER
      ══════════════════════════════════════ */}
      <div className="bg-linear-to-r from-violet-700 via-purple-700 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <button
            onClick={() => navigate("/")}
            className="text-violet-200 text-sm font-semibold hover:text-white transition-colors duration-200 mb-4 inline-flex items-center gap-1.5"
          >
            ← Back to home
          </button>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            The Full Collection
          </h1>
          <p className="text-violet-200 text-base max-w-2xl">
            {pagination
              ? `${pagination.total.toLocaleString()} books, journals, and resources — search, filter, and find your next read.`
              : "Search, filter, and find your next read."}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FILTER BAR
      ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-7 bg-white border border-gray-100 rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col lg:flex-row gap-3 z-10">
          <div className="flex-1 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by Title, Author, Genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-colors text-sm text-gray-800"
            />
          </div>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full lg:w-56 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-colors text-sm text-gray-800"
          >
            <option value="allGenres">All Categories</option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full lg:w-52 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-colors text-sm text-gray-800"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold text-violet-600 border border-violet-200 hover:bg-violet-50 transition-colors duration-200"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                "{searchQuery.trim()}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-violet-900"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedGenre !== "allGenres" && (
              <span className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {selectedGenre}
                <button
                  onClick={() => setSelectedGenre("allGenres")}
                  className="hover:text-violet-900"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════
          RESULTS GRID
      ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div
                key={i}
                className="w-full aspect-2/3 rounded-xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-semibold mb-2">
              Something went wrong
            </p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-700 font-bold text-lg mb-1">
              No books match your search
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Try a different title, author, or clear your filters.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors duration-200"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
              {books.map((book) => (
                <BookCard
                  key={book.bId}
                  book={book}
                  imageSrc={`${COVER_BASE_URL}/${book.coverImage}`}
                  title={book.bTitle}
                  author={book.bAuthor}
                  availability={book.bStatus}
                  genre={book.bGenre}
                  className="hover:scale-105 transition-transform"
                />
              ))}
            </div>

            {/* ── Pagination ── */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
                <button
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => p - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-violet-400 hover:text-violet-600 transition-colors duration-200"
                >
                  ← Prev
                </button>

                {getPageNumbers().map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`dots-${i}`}
                      className="px-2 text-gray-400 text-sm"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => {
                        setPage(p);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                        p === pagination.page
                          ? "bg-violet-600 text-white shadow shadow-violet-200"
                          : "text-gray-600 border border-gray-200 hover:border-violet-400 hover:text-violet-600"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  disabled={page >= pagination.pages}
                  onClick={() => {
                    setPage((p) => p + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-violet-400 hover:text-violet-600 transition-colors duration-200"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AllBooksPage;
