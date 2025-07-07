function Slide01() {
  return (
    <div className="bg-[#F5F5F5] flex justify-center h-[50vh] md:h-[70vh]">
      <div className="container grid grid-cols-1 md:grid-cols-2 text-black">
        <div className="flex flex-col gap-0 md:gap-5 items-center justify-center py-2 md:py-4">
          <h4 className="text-3xl sm:text-4xl md:text-4xl font-bold leading-tight text-center px-4 md:px-0">
            <span className="block">
              Caroneie com estilo e{" "}
              <span className="text-[#00AFF5]">Pague menos</span>
            </span>
            <span className="block text-base sm:text-lg md:text-xl font-normal text-black mt-3">
              Viajar com praticidade nunca foi tão fácil.
            </span>
          </h4>

          <div className="flex justify-around gap-4 w-full">
            <div className="hidden w-full md:flex md:justify-center md:items-center md:py-8"></div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <img
            src="https://ik.imagekit.io/asis0anat/Group%201.svg?updatedAt=1751654228182"
            alt="Imagem Página Home"
            className="w-2/3 md:w-2/3 mx-auto h-52 md:h-80 lg:h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Slide01;
