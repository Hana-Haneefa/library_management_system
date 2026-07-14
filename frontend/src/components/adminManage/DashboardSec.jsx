import bookIcon from "../../images/icons/book.png";
import memberIcon from "../../images/icons/member.png";
import borrowIcon from "../../images/icons/borrow.png";
import billIcon from "../../images/icons/bill.png";
import { useState, useRef, useEffect } from "react";
import api from "../../services/api.js";

function DashboardSec() {
  const [activeTab, setActiveTab] = useState("charts");
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    activeBorrows: 0,
    pendingFines: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const contentRef = useRef(null);

  useEffect(() => {
    // Fade-in animation
    const content = contentRef.current;
    if (content) {
      content.style.opacity = "0";
      content.style.transform = "translateY(50px)";
      requestAnimationFrame(() => {
        setTimeout(() => {
          content.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          content.style.opacity = "1";
          content.style.transform = "translateY(0)";
        }, 100);
      });
    }

    // Fetch actual statistics
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/borrows/dashboard-stats");
        if (res.data.success) {
          setStats(res.data.data);
        } else {
          setError("Failed to fetch dashboard stats");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Server error while fetching stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    { title: "Total Books", value: stats.totalBooks, suffix: "", icon: bookIcon },
    { title: "Total Members", value: stats.totalMembers, suffix: "", icon: memberIcon },
    { title: "Active Borrows", value: stats.activeBorrows, suffix: "", icon: borrowIcon },
    { title: "Pending Fines", value: stats.pendingFines, suffix: " LKR", icon: billIcon },
  ];

  return (
    <div ref={contentRef}>
      {/* filters */}
      <div className="settings w-full h-auto flex flex-col sm:flex-row px-4 py-2 text-white/70 justify-between mb-2 gap-3 sm:gap-0">
        {/* Tab Buttons */}
        <div className="setLeft flex gap-2 border-b border-white/30 mb-0 sm:mb-6">
          <button
            onClick={() => setActiveTab("charts")}
            className={`px-4 sm:px-6 py-2 font-semibold transition-all duration-300
              ${
                activeTab === "charts"
                  ? "border-b-2 border-purple-400 text-purple-400"
                  : "text-white/50 hover:text-white"
              }`}
          >
            Charts
          </button>
          <button
            onClick={() => setActiveTab("tables")}
            className={`px-4 sm:px-6 py-2 font-semibold transition-all duration-300
              ${
                activeTab === "tables"
                  ? "border-b-2 border-purple-400 text-purple-400"
                  : "text-white/50 hover:text-white"
              }`}
          >
            Tables
          </button>
          <button
            onClick={() => setActiveTab("graphs")}
            className={`px-4 sm:px-6 py-2 font-semibold transition-all duration-300
              ${
                activeTab === "graphs"
                  ? "border-b-2 border-purple-400 text-purple-400"
                  : "text-white/50 hover:text-white"
              }`}
          >
            Graphs
          </button>
        </div>

        {/* Filter and Search Buttons */}
        <div className="setRight flex h-10 gap-3 sm:gap-8">
          <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer">
            Filter
          </button>
          <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer flex-1 sm:flex-none">
            <input
              type="search"
              placeholder="Search..."
              className="bg-transparent focus:outline-none pb-1 pl-2 w-full sm:w-auto"
            />
            Search
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="cards w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, i) => (
          <div
            key={i}
            className="h-40 w-auto bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group"
          >
            <div className="icon w-10 h-10 rounded-full absolute top-4 right-4">
              <img
                src={card.icon}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="content p-4">
              <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              {loading ? (
                <div className="h-8 w-20 bg-white/20 animate-pulse rounded-md mt-1" />
              ) : error ? (
                <p className="text-sm font-bold text-red-300">Error</p>
              ) : (
                <p className="text-3xl font-bold text-white">
                  {card.value.toLocaleString()}{card.suffix}
                </p>
              )}
            </div>
            <span className="absolute bottom-2 right-4 text-xs text-white/70">
              Real-time DB Data
            </span>
          </div>
        ))}
      </div>

      {/* graphs */}
      <div className="graphs flex flex-col lg:flex-row h-auto gap-4 mt-4 min-h-64">
        <div className="w-full lg:w-2/3 h-64 lg:h-full bg-white/20 rounded-2xl border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg"></div>
        <div className="w-full lg:w-1/3 h-64 lg:h-full bg-white/20 rounded-2xl border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg"></div>
      </div>
    </div>
  );
}

export default DashboardSec;
