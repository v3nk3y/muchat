import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      {/* TODO: Update image with loading icon */}
      <Image
        src="/images/next.svg"
        alt="loading"
        width={50}
        height={50}
        className="w-auto h-auto"
      />
    </div>
  );
};

export default Loader;
