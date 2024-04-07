import Navbar from "@/components/Navbar";
import Sidenav from "@/components/Sidenav";
import { PropsWithChildren } from "react";

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
