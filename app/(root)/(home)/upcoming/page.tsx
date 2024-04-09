import CallList from "@/components/CallList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muchat - Upcoming",
  description:
    "Stay Organized - View all your upcoming video meetings in a clear and concise schedule, ensuring you never miss a call.",
};

const Upcoming = () => {
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-3xl font-bold">Upcoming</h1>
      <CallList type="upcoming" />
    </section>
  );
};

export default Upcoming;
