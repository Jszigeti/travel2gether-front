// REACT HOOKS
import { useState, useEffect } from "react";

// ROUTER
import { NavLink } from "react-router-dom";

// COMPONENTS
import { Navbar, Collapse, IconButton, Avatar } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import SearchMenu from "./SearchMenu";

// PROPS INTERFACE
interface HeaderProps {
  pageTitle?: string;
  backLink?: string;
}

// NAVLINKS ARRAY
const navLinks = [
  { path: "/my-profile", name: "Mon profil" },
  { path: "/my-profile/notifications", name: "Mes notifications" },
  { path: "/my-profile/messages", name: "Mes messages" },
  { path: "/my-profile/groups", name: "Mes groupes" },
  { path: "/my-profile/invitations", name: "Mes invitations" },
];

// NAVLIST FUNCTION
function NavList({ closeNav }: { closeNav?: () => void }) {
  return (
    <nav className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-center lg:gap-6 text-black">
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className="mb-3 font-bold"
          onClick={closeNav}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Header({ pageTitle, backLink }: HeaderProps) {
  const [openNav, setOpenNav] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <header>
      <Navbar className="mx-auto max-w-screen-xl px-6 py-3 rounded-none relative z-30">
        <div className="flex items-end justify-end text-blue-gray-900 relative">
          <NavLink to="/" className="absolute left-1">
            <img src="/src/assets/logo/logo.svg" />
          </NavLink>
          <div className="hidden xl:block lg:mr-4">
            <NavList />
          </div>
          <div className="flex items-center gap-6">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              size="md"
            />
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent xl:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-8 w-8" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-8 w-8" strokeWidth={2} />
              )}
            </IconButton>
          </div>
        </div>
        <div className="mt-6">
          {pageTitle && backLink ? (
            <div className="relative">
              <h1 className="text-green text-center">{pageTitle}</h1>

              <NavLink
                to={backLink}
                className="absolute top-0 left-2 text-blue"
              >
                <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
                <span className="ml-4 hidden md:inline font-bold">Retour</span>
              </NavLink>
            </div>
          ) : (
            <div
              onClick={() => setOpenSearch(!openSearch)}
              className="bg-white text-black border border-blue rounded-lg p-2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-500"
              />
            </div>
          )}
        </div>
        <Collapse open={openSearch}>
          <div className="h-fit flex flex-col items-center pt-10">
            <SearchMenu />
          </div>
        </Collapse>
      </Navbar>
      <Collapse
        open={openNav}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      >
        <div className="min-h-screen pt-40">
          <XMarkIcon
            className="h-8 w-8 absolute top-4 right-4"
            strokeWidth={2}
            onClick={() => setOpenNav(false)}
          />
          <h1 className="text-black mb-6 text-center">MENU</h1>
          <NavList closeNav={() => setOpenNav(false)} />
        </div>
      </Collapse>
    </header>
  );
}
