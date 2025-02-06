import Link from "next/link";
import Image from "next/image";
import ProfileContainer from "./ProfileContainer";
export default function DashboardSideBar() {
  return (
    <div className=" flex flex-col gap-y-2 w-1/6 border-r-2 p-4  justify-between overflow-y-auto">
      <div className="flex flex-col gap-y-2 items-center">
        <Link
          className=" w-2/3 flex gap-x-2 border-2 border-cyan-700 rounded-md justify-center py-2 px-4"
          href="/make-recipe/generar"
        >
          Generar
          <Image
            src="/Icons/icons8-documents.svg"
            width={20}
            height={20}
            alt="document icon"
          />
        </Link>
        <Link
          className=" w-2/3 flex gap-x-2 border-2 border-cyan-700 rounded-md justify-center py-2 px-4"
          href="/make-recipe/mis-recetas"
        >
          Mis recetas{" "}
          <Image
            src="/Icons/icons8-cookbook.svg"
            width={20}
            height={20}
            alt="cookbook icon"
          />
        </Link>
      </div>
      {/* Profile */}
      <div className="self-start">
        <ProfileContainer />
      </div>
    </div>
  );
}
