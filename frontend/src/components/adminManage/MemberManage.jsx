import { useState } from "react";
import StudentManage from "../adminManage/StudentManage.jsx";

function MemberManage() {
  const [activeTab, setActiveTab] = useState("students");
  return (
    <div className="memberManagement">
      {/* ⁡⁣⁣⁢𝘛𝘢𝘣 𝘉𝘶𝘵𝘵𝘰𝘯𝘴⁡ */}
      <div className="flex gap-2 border-b border-white/30 mb-6">
        <button
          onClick={() => setActiveTab("students")}
          className={`px-6 py-2 font-semibold transition-all duration-300
        ${
          activeTab === "students"
            ? "border-b-2 border-purple-400 text-purple-400" // active style
            : "text-white/50 hover:text-white" // inactive style
        }`}
        >
          Students
        </button>
        <button
          onClick={() => setActiveTab("librarians")}
          className={`px-6 py-2 font-semibold transition-all duration-300
        ${
          activeTab === "librarians"
            ? "border-b-2 border-purple-400 text-purple-400"
            : "text-white/50 hover:text-white"
        }`}
        >
          Librarians
        </button>
      </div>

      {/* ⁡⁣⁣⁢𝘛𝘢𝘣 𝘊𝘰𝘯𝘵𝘦𝘯𝘵⁡ */}
      {activeTab === "students" && <StudentManage />}

      {activeTab === "librarians" && (
        <div className="librariansTab">
          {/* librarians table / content */}
          <p className="text-white">Librarians content here...</p>
        </div>
      )}
    </div>
  );
}

export default MemberManage;
