import "./Header.css";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

type props = {
  theme: string;
  toggleTheme: () => void;
};

const Header = (props: props) => {
  return (
    <div className={`header_container `}>
      <div className="logo_container">
        <h1 className="title">Employee Management</h1>
      </div>
      <div className="button_container">
        <button
          className="theme"
          onClick={props.toggleTheme}
          aria-label="toggle theme"
        >
          {props.theme === "light" ? <MdOutlineWbSunny /> : <FiMoon />}
          <span>{props.theme === "light" ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
