import { cn } from "@/lib/utils";
import Image from "next/image";

interface HomeCardProps {
  className: string;
  image: string;
  title: string;
  description: string;
  handleClick: () => void;
}
const HomeCard = ({
  className,
  image,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "bg-slate-900 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-2xl cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center size-12 rounded-lg bg-gray-600">
        <Image
          src={image}
          alt={title}
          width={28}
          height={28}
          className="w-auto h-auto"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
