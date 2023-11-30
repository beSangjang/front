export default function Loading() {
  return (
    <div className="z-20 flex justify-center items-center  fixed top-0 left-0 w-screen h-screen  rounded-xl">
      <div className="pt-2 w-6/12 border  rounded-2xl text-center text-5xl font-extrabold   bg-white border-black">
        <p className="pt-4 text-black">Loading Data from Network</p>
        <div className=" w-full my-8 ">
          <img
            className="w-5/12 top-4 m-auto rounded-lg"
            src="https://i.pinimg.com/originals/ec/86/1e/ec861e53d36ca3713f30e51f5a8cb62d.gif"
            alt="waiting"
          ></img>
        </div>
      </div>
    </div>
  );
}
