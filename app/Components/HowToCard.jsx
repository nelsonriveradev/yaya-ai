import Link from "next/link";

export default function HowToCard(props) {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-cyan-700/[.8] font-semibold text-xl">{`${props.number}. ${props.title}`}</h5>
      <p>{props.description}</p>
      <div>
        <Link
          className="text-white bg-cyan-600/75 px-4 py-2 w-1/5 text-center text-lg rounded-lg "
          href="/make-recipe"
        >
          Comienza ahora
        </Link>
      </div>
    </div>
  );
}
