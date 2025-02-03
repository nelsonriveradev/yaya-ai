"use client";

import { signInWithGoogle, signIn } from "../actions/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const router = useRouter();

  async function signInAction(event) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      console.log("sign up function called");
      const emailForm = formData.get("email");
      const passwordForm = formData.get("password");

      await signIn(emailForm, passwordForm);
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
            Accede a tu cuenta
          </h1>
          <p className="text-center">Comienza a generar y guardar recetas.</p>
          <button
            onClick={signInWithGoogle}
            className="mt-5 border-2 rounded-lg px-3 py-2"
          >
            Accede con Google
          </button>
          <p className="mb-2">- or -</p>
        </div>
        {/* form */}
        <form
          className="flex flex-col gap-4 w-full md:w-3/4 m-auto p-6 bg-gray-100 rounded-xl drop-shadow-md"
          onSubmit={signInAction}
        >
          <div className="flex flex-col">
            <label htmlFor="email">Correo eletrónico</label>
            <input
              required
              className="border-2 rounded-xl p-2 drop-shadow-sm"
              id="email"
              name="email"
              type="email"
              placeholder="mail@email.com"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Contraseña</label>
            <input
              required
              className="border-2 rounded-xl p-2 drop-shadow-sm"
              id="password"
              name="password"
              type="password"
            />
          </div>
          <button
            className="bg-cyan-700/70 text-white px-4 py-2 rounded-xl w-full md:w-1/4 self-center mt-3 drop-shadow-sm"
            type="submit"
          >
            Acceder
          </button>
        </form>
      </div>
      <div className="hidden md:flex bg-cyan-700/70 md:w-6/12 justify-center items-center">
        <Image
          className="m-auto pt-[25%]"
          src="/illustrations/3d-yaya-holding-phone.png"
          width={400}
          height={400}
          alt="YAYA AI holding a phone"
        />
      </div>
    </div>
  );
}
