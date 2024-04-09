import Navbar from "@/components/Navbar";
import Sidenav from "@/components/Sidenav";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Muchat",
  description:
    "Experience secure video calls with screen sharing, chat functionality, and more, all within a user-friendly interface built with Next.js, React, TypeScript, Tailwind CSS and Clerk",
};

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidenav />
        <section className="flex flex-col flex-1 min-h-screen pt-8 px-6 pb-6 max-md:pb-14 sm:pt-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
