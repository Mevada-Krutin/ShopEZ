import SliderBar from "./SliderBar";

const MidSlide = ({ products, title, timer }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-6">
      {/* Left Section (Slider) */}
      <div className="w-full md:w-4/5 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <SliderBar products={products} title={title} timer={timer} />
      </div>

      {/* Right Section (Advertisement) */}
      <div className="w-full md:w-1/5 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/530/810/image/fc822dc700322fcd.jpg?q=20"
          alt="Advertisement"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
        />
      </div>
    </div>
  );
};

export default MidSlide;
