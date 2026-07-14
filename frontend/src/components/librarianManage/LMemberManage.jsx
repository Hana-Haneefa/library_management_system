import { useState } from "react";
import StudentManage from "../adminManage/StudentManage.jsx";

function LMemberManage() {
  const [activeTab, setActiveTab] = useState("students");
  return (
    <div className="memberManagement">
      {/* Tab Buttons */}
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
      </div>

      {/* Tab Content */}
      {activeTab === "students" && <StudentManage />}
    </div>
  );
}

export default LMemberManage;
