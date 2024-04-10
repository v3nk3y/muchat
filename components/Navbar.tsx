import Link from "next/link";
import MobileNav from "./MobileNav";
import { UserButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="text-white flex justify-between items-center w-full z-50 bg-gray-900 pl-3 pr-6 py-[10px]">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/muchat-logo1.svg"
          alt="logo"
          width={100}
          height={40}
        />
        {/* <p className="text-[24px] font-extrabold text-white max-sm:hidden">
          Muchat
        </p> */}
      </Link>

      <div className="flex justify-between items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
