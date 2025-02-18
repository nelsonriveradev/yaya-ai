"use client";
import Reader from "@/app/Components/Reader";
import LoadingCircle from "@/app/Components/LoadingCircle";

export default function RecipeViewer({ loading, recipe }) {
  return (
    <div className="w-3/4 h-[35rem] overflow-y-scroll scrollbar-thin">
      {loading ? (
        <div className="w-fit mx-auto mt-20">
          <LoadingCircle width={75} height={75} />
        </div>
      ) : (
        <Reader recipe={recipe} />
      )}
    </div>
  );
}
