import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  function clickThemeButton() {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <button
      onClick={clickThemeButton}
      className="text-white px-3 py-2 rounded-full transition-all duration-300"
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
    </button>
  );
}

export default DarkMode;
