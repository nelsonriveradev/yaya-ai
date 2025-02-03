"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { logOut } from "../actions/auth";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function NavBar(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav
      className={`text-gray-100 "bg-cyan-700 flex flex-col md:flex-row items-center p-4 justify-between w-full md:w-4/5 m-auto `}
    >
      <Link className="self-start  md:" href="/">
        <Image
          src="/illustrations/3d-yaya-holding-phone.png"
          width={50}
          height={50}
          alt="Yaya Ai Logo"
        />
      </Link>
      <button
        className="md:hidden p-2 self-end my-auto"
        onClick={toggleNav}
        aria-label="Toggle Navigation"
      >
        {isNavOpen ? (
          <Image
            src="/Icons/icons8-cancel-white.svg"
            width={30}
            height={30}
            alt="menu icon"
          />
        ) : (
          <Image
            src="/Icons/icons8-menu-white.svg"
            width={30}
            height={30}
            alt="cancel icon"
          />
        )}
      </button>

      <ul
        className={`flex flex-col md:flex-row justify-evenly gap-6 items-center transition-transform duration-300 ease-in-out  ${
          isNavOpen ? "block" : "hidden md:flex"
        }`}
      >
        <li className="text-lg ">
          <Link href="/">Inicio</Link>
        </li>
        <li className="text-lg">
          <Link href="/make-recipe" prefetch={true}>
            Generar Recetas
          </Link>
        </li>
        <li className="text-lg">
          <Link href="/about">Sobre Nosotros</Link>
        </li>
        {user ? (
          <li className="">
            <button
              className="text-lg border-2 border-gray-300 rounded-xl py-1 px-2"
              onClick={logOut}
            >
              Cerrar Session
            </button>
          </li>
        ) : (
          <li className="text-lg border-2 border-gray-300 rounded-xl py-1 px-2">
            <Link href="/sign-up" alt="Sign up" prefetch={true}>
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
