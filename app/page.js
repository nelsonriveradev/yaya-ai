"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./Components/NavBar";
import HowToCard from "./Components/HowToCard";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <div className="bg-cyan-700 text-white">
        <div>
          {/* hero */}
          <section className="flex flex-col md:flex-row items-center justify-center  gap-2 mb-4">
            {/* TEXT HERO */}
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <h1 className="text-4xl md:text-8xl font-bold tracking-widest">
                YAYA AI
              </h1>
              <p className="text-md md:text-xl w-80 md:w-96 tracking-wider">
                Genera recetas con ingredientes disponible a la mano con AI
              </p>
              <Link
                className="bg-cyan-300/75 py-3 px-4 rounded-2xl text-lg mt-4 mb-5 drop-shadow-md md:mb-5"
                href="/make-recipe"
              >
                Comienza ahora!
              </Link>
            </div>
            <div>
              <Image
                src="/illustrations/3d-yaya-making-heart(reduce).webp"
                alt="Yaya AI"
                width={300}
                height={300}
              />
            </div>
          </section>
        </div>
      </div>
      {/* How to use it */}
      <section className="flex flex-col justify-center items-center">
        <h1 className="mt-8 font-semibold text-3xl md:text-5xl text-cyan-700/70">
          Como usar YAYA AI
        </h1>
        <div className="flex flex-col items-center gap-6 w-10/12">
          <div className="flex flex-col md:flex-row gap-8 py-4 justify-evenly items-center">
            <Image
              src="/illustrations/3d-groceries-bag(reduce).webp"
              height={300}
              width={300}
              alt="Groceries in a paper bag"
            />
            <HowToCard
              number="1"
              title="Ingresa los ingredientes."
              description="Añade todo los ingredientes a la lista que tienes a la mano."
            />
          </div>
          <div className="flex flex-col md:flex-row gap-8 py-4 justify-evenly  items-center">
            <Image
              className=""
              src="/illustrations/3d-casual-life-young-smiling-woman-working-at-laptop-1(reduce).webp"
              height={300}
              width={300}
              alt="Girl Working on a Laptop"
            />
            <HowToCard
              number="2"
              title="Presiona el boton de generar receta."
              description="Espera que YAYA AI genere una receta con los ingredientes que le enviaste."
            />
          </div>
          <div className="flex flex-col md:flex-row gap-8 py-4 justify-evenly items-center">
            <Image
              src="/illustrations/3d-mom-and-daughter-cooking(reduce).webp"
              height={300}
              width={300}
              alt="Mother and Daughter cooking"
            />
            <HowToCard
              number="3"
              title="Cocina la receta."
              description="Sigue los pasos de la receta y disfruta de tu esquisito plato."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
