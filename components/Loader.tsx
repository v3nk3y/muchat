import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Image
        src="/icons/loading-squares.svg"
        alt="Loading..."
        width={50}
        height={50}
        priority={true}
      />
    </div>
  );
};

export default Loader;
