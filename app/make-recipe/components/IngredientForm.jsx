import Image from "next/image";

export default function IngredientForm(props) {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target);
    props.formDataHandle(formData);
    event.target.reset(); // Optionally reset the form after submission
  };

  return (
    <div className="flex flex-col md:flex-row  gap-x-4 justify-end mt-5 px-2 w-full md:w-auto py-2 items-center border-4 rounded-xl  min-h-[77px]">
      <form
        className="flex flex-col md:flex-row justify-between gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="text-gray-800 p-1 border-gray-500 border-b-2 border-b-cyan-700/75 focus:outline-none focus:border-2 focus:border-cyan-700/75 focus:rounded-lg w-full md:w-auto"
          type="text"
          placeholder="Arroz"
          name="ingredient"
          id="ingredient"
        />
        <button
          type="submit"
          className="hover:animation-spin-fast bg-cyan-700/75 text-white py-1 px-1   md:self-center rounded-lg"
        >
          <Image
            className="hover:animation-spin-fast text-center"
            src="/Icons/icons8-plus-white.svg"
            height={30}
            width={30}
            alt="add icon"
          />
        </button>
        <div className={`w-full md:w-[120px] mt-4 md:mt-0`}>
          <button
            onClick={props.getRecipe}
            disabled={props.loading}
            className={`${
              props.loading ? "disabled: opacity-50 cursor-not-allowed" : ""
            } ${
              props.generateShow ? "" : "hidden"
            } border-cyan-700/70 text-cyan-700/70 border-[3px] p-1 font-semibold rounded-lg text-sm w-full md:w-auto`}
          >
            Generar Receta
          </button>
        </div>
      </form>
    </div>
  );
}
