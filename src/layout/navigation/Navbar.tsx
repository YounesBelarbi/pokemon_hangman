import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/pokeball.svg?react";
import NavItem from "./NavItem";

const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <nav
      aria-label="main navigation"
      className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
      role="navigation"
    >
      {/*      <!-- Brand logo --> */}
      <NavLink
        to={"/"}
        className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
      >
        <Logo className="h-10 w-10" />
        Pokemon pendu
      </NavLink>

      {/*      <!-- Mobile trigger --> */}
      <button
        className={`relative order-10 block h-10 w-10 self-center lg:hidden
      ${
        isToggleOpen
          ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
          : ""
      }
      `}
        onClick={() => setIsToggleOpen(!isToggleOpen)}
        aria-expanded={isToggleOpen ? "true" : "false"}
        aria-label="Toggle navigation"
      >
        <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>
      {/*      <!-- Navigation links --> */}
      <ul
        role="menubar"
        aria-label="Select page"
        className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
          isToggleOpen
            ? "visible opacity-100 backdrop-blur-sm"
            : "invisible opacity-0"
        }`}
      >
        <NavItem route="/" label="Accueil" />
        <NavItem route="/hangman-pokemon" label="Pokemon pendu" />
        <NavItem route="/signup" label="S'inscrire" />
        <NavItem route="/login" label="Se connecter" />
      </ul>
      <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
        {/*        <!-- Avatar --> */}
        <NavLink
          to="/"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
        >
          <img
            src="https://i.pravatar.cc/40?img=35"
            alt="user name"
            title="user name"
            width="40"
            height="40"
            className="max-w-full rounded-full"
          />
          <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
            <span className="sr-only"> 7 new emails </span>
          </span>
        </NavLink>
        {/* <!-- End Avatar --> */}
      </div>
    </nav>
  );
};

export default Navbar;
