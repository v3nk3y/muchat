"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeCategory = () => {
  const [meetingState, setMeetingState] = useState<
    "scheduleMeeting" | "joinMeeting" | "instantMeeting" | undefined
  >();
  const router = useRouter();

  // Get logged in user
  const { user } = useUser();
  // Get stream video client
  const client = useStreamVideoClient();

  // For tracking meeting call start time
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    meetingLink: "",
  });

  // For tracking call details
  const [callDetails, setCallDetails] = useState<Call>();

  // For handling new meeting click
  const createMeeting = async () => {
    // if no user or client available then exit
    if (!client || !user) return;

    try {
      // Create a random id for the call
      const id = crypto.randomUUID();
      // Refer Creating a call stream docs: https://getstream.io/video/docs/api/
      const call = client.call("default", id);

      // If some stream call error then throw error
      if (!call)
        throw new Error("Oops something went wrong! Failed to create call.");

      //If call created then get time of meeting started at
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      // Create call with data
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        // Route to meeting room
        router.push(`/meeting/${call?.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      <MeetingModal
        isOpen={meetingState === "instantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Let's Catch Up Right Now!"
        className="text-center"
        buttonText="Start Meeting"
        buttonIcon=""
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeCategory;
