// ROUTER
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-screen-xl px-6 w-full bg-blue h-fit flex flex-col gap-10">
      <h2 className="text-white text-center pt-6 text-4xl">Travel2Gether</h2>
      <div className="flex flex-col md:flex-row items-center justify-around text-white text-xl gap-6">
        <NavLink to="/donate">Faites un don</NavLink>
        <NavLink to="/contact-us">Contactez-nous</NavLink>
        <NavLink to="/about">A propos</NavLink>
      </div>
      <p className="text-white text-center pb-6">© 2024 Travel2Gether</p>
    </footer>
  );
}
