import Link from "next/link";
import Image from "next/image";
import ProfileContainer from "./ProfileContainer";
export default function DashboardSideBar() {
  return (
    <div className=" flex flex-col gap-y-2 w-1/6 border-r-2 p-4  justify-between">
      <div className="flex flex-col gap-y-3 items-center">
        <Link
          className="flex gap-x-3 text-md items-center "
          href="/make-recipe/generar"
        >
          <span className="text-3xl">👩‍🍳</span> Crear
        </Link>
        <Link
          className="flex gap-x-3 text-md items-center "
          href="/make-recipe/mis-recetas"
        >
          <span className="text-3xl">🍽️</span> Recetas
        </Link>
      </div>
      {/* Profile */}
      <div className="self-start">
        <ProfileContainer />
      </div>
    </div>
  );
}
