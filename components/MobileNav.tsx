"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidenavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import link from "next/link";

const MobileNav = () => {
  // Get current pathname
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          {/* #TODO: Until we get the image hamburger menu */}
          <span className="cursor-pointer sm:hidden">
            <Image
              src="/icons/three-dots.svg"
              alt="nav icon"
              width={40}
              height={40}
              className="w-auto h-auto"
            />
          </span>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-gray-900">
          <Link href="/" className="flex items-center gap-1">
            {/* #TODO: Temporary until we figure out the Icon here */}
            <span>💬</span>
            <p className="text-[24px] font-extrabold text-white max-sm:hidden">
              Muchat
            </p>
          </Link>
          <div className="flex flex-col justify-between h-[calc(100vh-72px)] overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col h-full gap-6 pt-16 text-white">
                {sidenavLinks.map((link) => {
                  // StartsWith is for additional check in case we have other params in path
                  const isActive =
                    pathname === link.route ||
                    pathname.startsWith(`${link.route}/`);
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        className={cn(
                          "flex gap-4 items-center w-full max-w-60 p-4 rounded-lg",
                          { "bg-blue-700": isActive }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt="mobile nav icon"
                          width={40}
                          height={40}
                          className="w-auto h-auto"
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
