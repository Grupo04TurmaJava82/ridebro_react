function Slide02() {
  return (
    <div
      className="
                flex
                justify-center
                bg-[#F5F5F5]
                bg-repeat
                h-[50vh] md:h-[70vh]
                "
    >
      <div
        className="
                    container
                    grid
                    grid-cols-1 md:grid-cols-2
                    text-black
                    "
      >
        <div
          className="
                        flex
                        flex-col
                        gap-2 md:gap-4
                        items-center
                        justify-center
                        py-2 md:py-4
                        "
        >
          <h2
            className="
                            text-3xl md:text-5xl
                            font-bold
                            text-center
                            "
          >
            Você é motorista?
          </h2>
          <p className="text-lg md:text-1.5xl text-center">
            Transforme suas rotas em economia real no seu dia a dia!
          </p>
          <button className="bg-[#00AFF5] hover:bg-[#81d4fa] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
            <a href="#">Oferecer Carona</a>
          </button>
        </div>

        <div className="flex justify-center items-center w-full">
          <img
            src="https://ik.imagekit.io/asis0anat/Group%203704.svg?updatedAt=1751675792555"
            alt="Imagem Página Home"
            className="w-2/3 md:w-3/4 mx-auto h-64 md:h-96 lg:h-[28rem] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Slide02;
