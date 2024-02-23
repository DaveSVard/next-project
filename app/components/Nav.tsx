"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./../styles/Nav.scss"

export const Nav = () => {
  const pathname = usePathname();
  const router = useRouter()
  const logOut = () => {
    localStorage.clear()
    router.push("/")
}

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <img src="./../images/tree.png" alt="Logo" />
          </div>
          {localStorage.token ? <ul className="nav-list">
            <li>
              <Link
                className={`${"nav-list__item"} ${pathname === "/profile" ? "active" : ""}`}
                href="/profile"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                className={`${"nav-list__item"} ${pathname === "/settingsUser" ? "active" : ""}`}
                href="/settingsUser"
              >
                Settings
              </Link>
            </li>
            <li>
              <button onClick={() => logOut()}><i className="fa-solid fa-right-from-bracket"></i></button>
            </li>
          </ul>
          : <ul className="nav-list">
          <Link
            className={`${"nav-list__item"} ${pathname === "/" ? "active" : ""}`}
            href="/"
          >
            LogIn
          </Link>
          <Link
            className={`${"nav-list__item"} ${pathname === "/register" ? "active" : ""}`}
            href="/register"
          >
            Registration
          </Link>
        </ul> }
        </div>
      </div>
    </nav>
  );
};
