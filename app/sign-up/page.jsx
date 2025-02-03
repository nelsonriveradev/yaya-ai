"use client";

import { useState, useEffect } from "react";
import { signUp, signInWithGoogle } from "@/app/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUp() {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  async function signUpAction(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const nameForm = formData.get("name");
      const emailForm = formData.get("email");
      const passwordForm = formData.get("password");
      setSignUpForm({
        name: nameForm,
        email: emailForm,
        password: passwordForm,
      });

      await signUp(emailForm, passwordForm, nameForm);

      router.push("/make-recipe");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex flex-col md:w-8/12 p-4 md:p-10">
        {/* text */}
        <div className="flex flex-col items-center mt-10 gap-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest">
            Hazte una cuenta
          </h1>
          <p className="text-center">
            Asi podras guardar y compartir tus recetas y tenerlas a la mano.
          </p>
          <button
            onClick={signInWithGoogle}
            className="mt-5 border-2 rounded-lg px-3 py-2"
          >
            Comienza con Google
          </button>
          <p className="mb-2">- or -</p>
        </div>
        {/* form */}
        <form
          className="flex flex-col gap-4 w-full md:w-3/4 m-auto p-6 bg-gray-100 rounded-xl drop-shadow-md"
          onSubmit={signUpAction}
        >
          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="name">
              Name
            </label>
            <input
              className="border-2 rounded-xl p-2 drop-shadow-sm"
              id="name"
              name="name"
              placeholder="Juan del Pueblo"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Correo eletrónico</label>
            <input
              className="border-2 rounded-xl p-2 drop-shadow-sm"
              id="email"
              name="email"
              type="email"
              placeholder="mail@email.com"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Contraseña</label>
            <input
              className="border-2 rounded-xl p-2 drop-shadow-sm"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <button
            className="bg-cyan-700/70 text-white px-4 py-2 rounded-xl w-full md:w-1/4 self-center mt-3 drop-shadow-sm"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-5">
          <p className="text-center text-gray-800">
            Ya tienes cuenta? Accede{" "}
            <Link className="underline text-cyan-700/75" href="/log-in">
              aquí
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex bg-cyan-700/75 md:w-6/12 justify-center items-center">
        <Image
          className="m-auto pt-[25%]"
          src="/illustrations/yaya-holding-phone(reduce).webp"
          width={400}
          height={400}
          alt="YAYA AI holding a phone"
        />
      </div>
    </div>
  );
}
