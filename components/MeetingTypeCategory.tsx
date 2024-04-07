"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard from "./HomeCard";

const MeetingTypeCategory = () => {
  const [meetingState, setMeetingState] = useState<
    "scheduleMeeting" | "joinMeeting" | "instantMeeting" | undefined
  >();
  const router = useRouter();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* #TODO: Replace card icon images */}
      <HomeCard
        title="New Meeting"
        description="Lets catch up right now"
        image="/images/next.svg"
        handleClick={() => setMeetingState("instantMeeting")}
        className="bg-slate-800"
      />
      <HomeCard
        title="Schedule Meeting"
        description="Plan your chit chat"
        image="/images/next.svg"
        handleClick={() => setMeetingState("scheduleMeeting")}
        className="bg-slate-800"
      />
      <HomeCard
        title="Join Meeting"
        description="Using Invitation link"
        image="/images/next.svg"
        handleClick={() => setMeetingState("joinMeeting")}
        className="bg-slate-800"
      />
      <HomeCard
        title="View Recordings"
        description="Check out your recordings"
        image="/images/next.svg"
        handleClick={() => router.push("/recordings")}
        className="bg-slate-800"
      />
    </section>
  );
};

export default MeetingTypeCategory;
