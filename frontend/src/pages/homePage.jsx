import image from "../images/books3.jpg";
import step1 from "../images/icons/register.png";
import step2 from "../images/icons/brows.png";
import step3 from "../images/icons/qry.png";
import step4 from "../images/icons/repeat.png";
import newsLeft from "../images/newsLeft.jpg";
import pinned from "../images/icons/pin.png";
import bell from "../images/icons/bell.png";
import calendar from "../images/icons/calendar.png";
import arrowRight from "../images/icons/arrowRight.png";
// component for home page
import BookCard from "../components/Card.jsx";
import HeroSec from "../components/HeroSection.jsx";
import Navigation from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* ─── Quick Action Card data ─── */
const quickActions = [
  {
    label: "Search Catalogue",
    badge: "10+ Veries",
    badgeColor: "bg-violet-600",
    textColor: "text-violet-300",
    borderColor: "border-violet-500/40",
    desc: "Find books, journals, and digital resources in one place.",
    icon: "🔍",
  },
  {
    label: "Book Collection",
    badge: "2500+ Books",
    badgeColor: "bg-blue-600",
    textColor: "text-blue-300",
    borderColor: "border-blue-500/40",
    desc: "Explore our physical and digital library collections.",
    icon: "📚",
  },
  {
    label: "Study Room",
    badge: "22 Available",
    badgeColor: "bg-emerald-600",
    textColor: "text-emerald-300",
    borderColor: "border-emerald-500/40",
    desc: "Reserve a quiet space for focused study or group work.",
    icon: "🏛️",
  },
  {
    label: "Fine Details",
    badge: "0 Dues",
    badgeColor: "bg-rose-600",
    textColor: "text-rose-300",
    borderColor: "border-rose-500/40",
    desc: "Check and pay your outstanding library fines.",
    icon: "📋",
  },
];

/* ─── Steps data ─── */
const steps = [
  {
    num: "01",
    icon: step1,
    title: "Register",
    desc: "Create your library account. Admin involvement required for registration.",
    color: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/30",
    badge: "Step 1",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    num: "02",
    icon: step2,
    title: "Browse the Catalog",
    desc: "Search for books, journals, and digital resources in our catalog.",
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/30",
    badge: "Step 2",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    num: "03",
    icon: step3,
    title: "Scan and Borrow",
    desc: "Use our easy scanning system to borrow books and other resources.",
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/30",
    badge: "Step 3",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    num: "04",
    icon: step4,
    title: "Return & Repeat",
    desc: "Return items on time and continue exploring our growing collection.",
    color: "from-rose-500 to-pink-500",
    shadow: "shadow-rose-500/30",
    badge: "Step 4",
    badgeColor: "bg-rose-100 text-rose-700",
  },
];

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-violet-500 bg-violet-50 border border-violet-200 rounded-full px-4 py-1 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-base max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      {/* ── Navigation ── */}
      <Navigation />

      {/* ── Hero ── */}
      <HeroSec />

      {/* ══════════════════════════════════════
          QUICK ACTION CARDS
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          eyebrow="Explore"
          title="What would you like to do?"
          subtitle="Everything you need to make the most of your library experience."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden border ${item.borderColor} bg-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer`}
            >
              {/* Background image with overlay */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={image}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                {/* Badge */}
                <span
                  className={`absolute top-3 right-3 ${item.badgeColor} text-white text-xs font-semibold py-1 px-3 rounded-full shadow`}
                >
                  {item.badge}
                </span>

                {/* Icon */}
                <div className="absolute bottom-3 left-3 text-3xl">
                  {item.icon}
                </div>
              </div>

              {/* Text content */}
              <div className="p-4">
                <h3
                  className={`font-bold text-lg mb-1 ${item.textColor.replace("text-", "text-").replace("300", "700")}`}
                >
                  {item.label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div
                  className={`mt-3 flex items-center gap-1 text-xs font-semibold ${item.textColor.replace("300", "600")}`}
                >
                  Explore
                  <img src={arrowRight} alt="" className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <div className="bg-linear-to-r from-violet-700 via-purple-700 to-indigo-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { num: "2,500+", label: "Books Available" },
              { num: "1,200+", label: "Active Members" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: "45+", label: "New This Week" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-3xl md:text-4xl font-black tracking-tight">
                  {stat.num}
                </span>
                <span className="text-violet-200 text-sm font-medium uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          HOW TO USE
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Getting Started"
          title="How to use the library?"
          subtitle="No paperwork, no manual entry — just scan and go in four simple steps."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting dashed line (desktop only) */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-violet-200 z-0" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative z-10 bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              {/* Numbered circle */}
              <div
                className={`w-14 h-14 rounded-2xl bg-linear-to-br ${step.color} shadow-lg ${step.shadow} flex items-center justify-center mb-4`}
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>

              <span
                className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${step.badgeColor}`}
              >
                {step.badge}
              </span>
              <h3 className="text-lg font-extrabold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Step number watermark */}
              <span className="absolute top-4 right-5 text-5xl font-black text-gray-100 select-none">
                {step.num}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRENDING BOOKS
      ══════════════════════════════════════ */}
      <section className="bg-linear-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-violet-500 bg-violet-50 border border-violet-200 rounded-full px-4 py-1 mb-2">
                Popular
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Trending Books
              </h2>
            </div>
            <button className="flex items-center gap-2 text-violet-600 font-semibold text-sm hover:gap-3 transition-all duration-200 group">
              View all books
              <img
                src={arrowRight}
                alt=""
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ANNOUNCEMENTS & NEWS
      ══════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-violet-500 bg-violet-50 border border-violet-200 rounded-full px-4 py-1 mb-2">
                Stay Updated
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Announcements & News
              </h2>
            </div>
            <span className="animate-pulse bg-violet-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-md shadow-violet-300">
              🔔 2 New
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* ── Featured / Pinned Article ── */}
            <div className="group rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={newsLeft}
                  alt="New book arrivals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-violet-700 rounded-full text-xs font-bold py-1.5 px-3 flex items-center gap-1.5 shadow">
                  <img src={pinned} alt="" className="w-3.5 h-3.5" />
                  Pinned
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <span className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 rounded-full text-xs font-bold py-1 px-3 w-fit mb-4">
                  <img src={bell} alt="" className="w-3.5 h-3.5" />
                  Announcement
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-snug">
                  45 new books added across 6 genres this week
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  Our library has expanded its collection with 45 new books
                  across 6 genres, including fiction, non-fiction, science,
                  history, and more. Explore the latest additions and discover
                  your next great read!
                </p>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <img src={calendar} alt="" className="w-3.5 h-3.5" />
                    3rd June 2026
                  </span>
                  <button className="flex items-center gap-1.5 text-violet-600 text-sm font-bold hover:gap-2.5 transition-all duration-200 group/btn">
                    Read More
                    <img
                      src={arrowRight}
                      alt=""
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Side Articles ── */}
            <div className="flex flex-col gap-5">
              {/* Alert card */}
              <div className="group flex rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 flex-1">
                <div className="relative w-32 sm:w-40 shrink-0 overflow-hidden">
                  <img
                    src={newsLeft}
                    alt="maintenance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute top-2 left-2 bg-red-600 text-white rounded-full text-xs font-bold py-0.5 px-2 flex items-center gap-0.5 shadow">
                    <img src={pinned} alt="" className="w-3 h-3" /> Alert
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base leading-snug mb-1">
                      System Maintenance — June 5, 2:00 pm – 8:00 pm
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      The online catalog and booking features will be
                      temporarily offline for planned system updates.
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <img src={calendar} alt="" className="w-3 h-3" />
                      3rd June 2026
                    </span>
                    <button className="flex items-center gap-1 text-red-500 text-xs font-bold hover:gap-2 transition-all duration-200">
                      Details{" "}
                      <img src={arrowRight} alt="" className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Update card */}
              <div className="group flex rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 flex-1">
                <div className="relative w-32 sm:w-40 shrink-0 overflow-hidden">
                  <img
                    src={newsLeft}
                    alt="QR update"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white rounded-full text-xs font-bold py-0.5 px-2 flex items-center gap-0.5 shadow">
                    <img src={pinned} alt="" className="w-3 h-3" /> Update
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base leading-snug mb-1">
                      QR Scan for Quick Book Return
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      Returning books is now even faster. Simply scan the QR
                      code tag at the counter and you're done.
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <img src={calendar} alt="" className="w-3 h-3" />
                      4th June 2026
                    </span>
                    <button className="flex items-center gap-1 text-emerald-600 text-xs font-bold hover:gap-2 transition-all duration-200">
                      Details{" "}
                      <img src={arrowRight} alt="" className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA mini banner */}
              <div className="rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 p-5 flex items-center justify-between gap-4 shadow-lg shadow-violet-200">
                <div>
                  <p className="text-white font-extrabold text-base">
                    Subscribe to Newsletter
                  </p>
                  <p className="text-violet-200 text-xs mt-0.5">
                    Get updates about new books and events.
                  </p>
                </div>
                <button className="shrink-0 bg-white text-violet-700 text-sm font-bold px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors duration-200 shadow">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
