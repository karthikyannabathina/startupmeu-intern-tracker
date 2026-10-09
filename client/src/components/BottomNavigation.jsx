
import { useEffect, useState } from "react";
import { House, ClipboardList } from "lucide-react";
import "./BottomNavigation.css";

const navigation = [
  { label: "Home", target: "home", Icon: House },
  {
    label: "Applications",
    target: "applications",
    Icon: ClipboardList,
  },
];

function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const main = document.querySelector(".main");
    const applications = document.getElementById("applications");

    if (!main || !applications) return;

    const updateActiveTab = () => {
      const mainRect = main.getBoundingClientRect();
      const appRect = applications.getBoundingClientRect();

      setActiveTab(
        appRect.top <= mainRect.top + mainRect.height * 0.45
          ? "applications"
          : "home"
      );
    };

    main.addEventListener("scroll", updateActiveTab, { passive: true });

    return () => {
      main.removeEventListener("scroll", updateActiveTab);
    };
  }, []);

  const handleNavigation = (target) => {
    const main = document.querySelector(".main");

    const element =
      target === "home"
        ? document.querySelector(".page-title")
        : document.getElementById("applications");

    if (!main || !element) return;

    const mainRect = main.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const top =
      main.scrollTop + elementRect.top - mainRect.top - 12;

    main.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });

    setActiveTab(target);
  };

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {navigation.map(({ label, target, Icon }) => (
        <button
          key={target}
          type="button"
          onClick={() => handleNavigation(target)}
          className={`bottom-nav__item${
            activeTab === target ? " bottom-nav__item--active" : ""
          }`}
          aria-current={activeTab === target ? "page" : undefined}
        >
          <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavigation;
