"use client";
import { sidenavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidenav = () => {
  // Get current pathname
  const pathname = usePathname();
  return (
    <section
      className="sticky left-0 top-0 h-screen w-fit flex flex-col justify-between p-6 pt-28 bg-gray-900 text-white
     max-sm:hidden lg:w-[264px]"
    >
      <div className="flex flex-col flex-1 gap-6">
        {sidenavLinks.map((link) => {
          // StartsWith is for additional check in case we have other params in path
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center justify-start p-4 rounded-lg hover:bg-slate-800",
                { "bg-blue-700": isActive }
              )}
            >
              <Image
                src={link.imgUrl}
                alt="nav icon"
                width={40}
                height={40}
                className="w-auto h-auto"
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidenav;
