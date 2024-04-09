import MeetingTypeCategory from "@/components/MeetingTypeCategory";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      {/* #TODO: Home top banner image */}
      <div className="h-[300px] w-full rounded-[20px] bg-slate-900 bg-cover">
        <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 sm:p-11">
          <h2 className="backdrop-blur-md max-w-[270px] rounded py-2 text-base font-normal text-slate-400">
            {/* TODO: HEading */}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-extrabold lg:text-4xl">{time}</h1>
            <p className="text-base font-medium lg:text-lg text-slate-400">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeCategory />
    </section>
  );
};

export default Home;
