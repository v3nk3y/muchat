import Link from "next/link";
import MobileNav from "./MobileNav";
import { UserButton, SignedIn } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="text-white flex justify-between items-center w-full z-50 bg-gray-900 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        {/* #TODO: Temporary until we figure out the Logo */}
        <span>💬</span>
        <p className="text-[24px] font-extrabold text-white max-sm:hidden">
          Muchat
        </p>
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
