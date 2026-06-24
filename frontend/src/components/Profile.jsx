import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import Navigation from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import axios from "axios";

// ── dummy data (replace with real API calls) ──────────────────────────────────
const DUMMY_BORROWED = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    author: "Charles P. Pfleeger",
    due: "2026-07-01",
    status: "active",
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    due: "2026-06-20",
    status: "overdue",
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    due: "2026-07-15",
    status: "active",
  },
];

const DUMMY_FINES = [{ id: 1, book: "Clean Code", days: 4, amount: 200 }];

// ── small helpers ─────────────────────────────────────────────────────────────
function Badge({ status }) {
  const map = {
    active: "bg-blue-100 text-blue-700",
    overdue: "bg-red-100  text-red-600",
    returned: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] ?? map.active}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Avatar({ name, size = "lg" }) {
  const letter = name?.charAt(0).toUpperCase() ?? "?";
  const sz = size === "lg" ? "w-24 h-24 text-4xl" : "w-10 h-10 text-lg";
  return (
    <div
      className={`${sz} rounded-full bg-linear-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg select-none`}
    >
      {letter}
    </div>
  );
}

// ── edit modal ────────────────────────────────────────────────────────────────
function EditModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-xl font-bold text-blue-800 mb-5">Edit Profile</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border-2 border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ____ main component __________________________________
export function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("borrowed");
  const [showEdit, setShowEdit] = useState(false);
  const [profileData, setProfileData] = useState(user);
  const [borrowed, setBorrowed] = useState(DUMMY_BORROWED);
  const [fines, setFines] = useState(DUMMY_FINES);

  // swap with real API call when ready
  // useEffect(() => {
  //   axios.get("/api/users/profile").then(r => setProfileData(r.data));
  //   axios.get("/api/borrow/my").then(r => setBorrowed(r.data));
  //   axios.get("/api/fines/my").then(r => setFines(r.data));
  // }, []);

  const handleSave = (updated) =>
    setProfileData((prev) => ({ ...prev, ...updated }));

  const totalFine = fines.reduce((acc, f) => acc + f.amount, 0);

  const tabs = [
    { id: "borrowed", label: "Borrowed Books", count: borrowed.length },
    { id: "fines", label: "Fines", count: fines.length },
    { id: "history", label: "History", count: null },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <Navigation />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {/* ── profile card ── */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          {/* banner */}
          <div className="h-28 sm:h-36 bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* info row */}
          <div className="px-4 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-14">
              {/* avatar + name */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3">
                <div className="ring-4 ring-white rounded-full shadow-lg">
                  <Avatar name={profileData?.name} size="lg" />
                </div>
                <div className="text-center sm:text-left pb-1">
                  <h1 className="text-2xl font-bold text-blue-900">
                    {profileData?.name ?? "Student"}
                  </h1>
                  <p className="text-sm text-blue-500 font-medium">
                    {profileData?.email}
                  </p>
                  <span className="inline-block mt-1 text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-0.5 rounded-full">
                    {profileData?.role ?? "Student"}
                  </span>
                </div>
              </div>

              {/* action buttons */}
              <div className="flex gap-2 justify-center sm:justify-end pb-1">
                <button
                  onClick={() => setShowEdit(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-xl border-2 border-red-400 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* stats row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { label: "Books Borrowed", value: borrowed.length },
                {
                  label: "Overdue",
                  value: borrowed.filter((b) => b.status === "overdue").length,
                },
                { label: "Total Fines", value: `Rs. ${totalFine}` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-blue-50 rounded-2xl p-3 sm:p-4 text-center"
                >
                  <p className="text-xl sm:text-2xl font-bold text-blue-700">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── tabs ── */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* tab bar */}
          <div className="flex border-b border-blue-100 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 min-w-max px-4 py-4 text-sm font-semibold transition-colors whitespace-nowrap
                  ${
                    activeTab === t.id
                      ? "text-blue-700 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/50"
                  }`}
              >
                {t.label}
                {t.count !== null && (
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold
                    ${activeTab === t.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* tab content */}
          <div className="p-4 sm:p-6">
            {/* borrowed books */}
            {activeTab === "borrowed" && (
              <div className="flex flex-col gap-3">
                {borrowed.length === 0 && (
                  <p className="text-center text-gray-400 py-10">
                    No borrowed books.
                  </p>
                )}
                {borrowed.map((book) => (
                  <div
                    key={book.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl border border-blue-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 rounded-lg bg-linear-to-b from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0">
                        📖
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900 text-sm sm:text-base">
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pl-13 sm:pl-0">
                      <div className="text-xs text-gray-400">
                        Due:{" "}
                        <span
                          className={
                            book.status === "overdue"
                              ? "text-red-500 font-semibold"
                              : "text-gray-600"
                          }
                        >
                          {book.due}
                        </span>
                      </div>
                      <Badge status={book.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* fines */}
            {activeTab === "fines" && (
              <div className="flex flex-col gap-3">
                {fines.length === 0 && (
                  <p className="text-center text-gray-400 py-10">
                    🎉 No fines! Keep returning books on time.
                  </p>
                )}
                {fines.map((fine) => (
                  <div
                    key={fine.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl border border-red-100 bg-red-50/40 hover:bg-red-50 transition-all"
                  >
                    <div>
                      <p className="font-semibold text-red-800 text-sm sm:text-base">
                        {fine.book}
                      </p>
                      <p className="text-xs text-gray-500">
                        {fine.days} days overdue
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-red-600 text-lg">
                        Rs. {fine.amount}
                      </span>
                      <button className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors">
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}

                {fines.length > 0 && (
                  <div className="mt-2 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex justify-between items-center">
                    <p className="font-semibold text-blue-800">Total Due</p>
                    <p className="text-xl font-bold text-blue-700">
                      Rs. {totalFine}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* history */}
            {activeTab === "history" && (
              <div className="text-center py-10 text-gray-400">
                <p className="text-4xl mb-3">📚</p>
                <p className="font-semibold">
                  Borrow history will appear here.
                </p>
                <p className="text-sm mt-1">
                  Connect the API to load real data.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {showEdit && (
        <EditModal
          user={profileData}
          onClose={() => setShowEdit(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Profile;
