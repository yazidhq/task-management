import { useEffect, useState } from "react";
import { get_current, logout_current } from "../services/auth.services";

const NavbarFragment = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      get_current(token.token, (success, response) => {
        if (success) {
          setCurrentUser(response);
        } else {
          console.log(response);
        }
      });
    } else {
      window.location = "/login";
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout_current(token.token, (success) => {
      if (success) {
        localStorage.removeItem("token");
        window.location = "/login";
      } else {
        alert("Unauthorize");
      }
    });
  };

  return (
    <div className="bg-zinc-900 flex justify-between py-5 px-5">
      <h1 className="text-gray-300 font-bold ml-14">DASHBOARD</h1>
      {currentUser ? (
        <div className="relative" onClick={toggleDropdown}>
          <p className="text-gray-300 font-bold cursor-pointer">
            {currentUser.data.name.toUpperCase()}
          </p>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 bg-zinc-800 w-40 rounded shadow-lg">
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-300 hover:bg-zinc-900 hover:rounded"
              >
                Profile
              </a>
              <div
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-300 hover:bg-zinc-900 hover:rounded"
              >
                <button>Logout</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <a href="/login">
          <p className="text-gray-300 font-bold">
            {currentUser == null ? "LOADING" : "LOGIN"}
          </p>
        </a>
      )}
    </div>
  );
};

export default NavbarFragment;
