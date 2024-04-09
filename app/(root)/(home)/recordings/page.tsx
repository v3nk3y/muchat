import CallList from "@/components/CallList";

const Recordings = () => {
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-3xl font-bold">Recordings</h1>
      {/* #TODO: fix the recordings issue */}
      <CallList type="recordings" />
    </section>
  );
};

export default Recordings;
