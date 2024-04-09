import CallList from "@/components/CallList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muchat - Previous",
  description:
    "Meeting History - View a comprehensive list of your past video conferences, allowing you to easily revisit previous sessions.",
};

const Previous = () => {
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-3xl font-bold">Previous</h1>
      <CallList type="ended" />
    </section>
  );
};

export default Previous;
