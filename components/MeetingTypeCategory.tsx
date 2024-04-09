"use client";

import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { Textarea } from "./ui/textarea";
import { Input } from "@/components/ui/input";

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

  // Handling toast notification
  const { toast } = useToast();

  // For handling new meeting click
  const createMeeting = async () => {
    // if no user or client available then exit
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date an time",
        });
        return;
      }
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

      toast({
        title: "Meeting created, Lets catch up!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Oops, Failed to create meeting!",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        title="New Meeting"
        description="Lets catch up right now"
        image="/icons/add-meeting.svg"
        handleClick={() => setMeetingState("instantMeeting")}
        className="bg-slate-800"
      />
      <HomeCard
        title="Schedule Meeting"
        description="Plan your chit chat"
        image="/icons/schedule.svg"
        handleClick={() => setMeetingState("scheduleMeeting")}
        className="bg-slate-800"
      />
      <HomeCard
        title="Join Meeting"
        description="Using Invitation link"
        image="/icons/join-meeting.svg"
        handleClick={() => setMeetingState("joinMeeting")}
        className="bg-slate-800"
      />
      <HomeCard
        title="View Recordings"
        description="Check out your recordings"
        image="/icons/recordings.svg"
        handleClick={() => router.push("/recordings")}
        className="bg-slate-800"
      />
      {/* If call details doesnt't exist then open a Create meeting modal */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "scheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a new Meeting"
          className="text-center"
          handleClick={createMeeting}
        >
          <div className="felx flex-col w-full gap-3">
            <label className="text-base text-normal leading-5 text-slate-200">
              Add a description
            </label>
            <Textarea
              className="bg-slate-700 border-none focus-visible:ring-slate-600 focus-visible:ring-offset-0 mt-2"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <label className="text-base text-normal leading-5 text-slate-200">
              Select Date and Time
            </label>
            <DatePicker
              className="rounded w-full bg-slate-700 p-2 focus:outline-none"
              selected={values.dateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(date) => setValues({ ...values, dateTime: date! })}
            />
          </div>
        </MeetingModal>
      ) : (
        // If call details exist(i.e meeting created) then show the Meeting Created modal with scheduled meeting link & copy button
        <MeetingModal
          isOpen={meetingState === "scheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created!"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      {/* Instant new meeting modal */}
      <MeetingModal
        isOpen={meetingState === "instantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Let's Catch Up Right Now!"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      {/* Join meeting modal via invitation link*/}
      <MeetingModal
        isOpen={meetingState === "joinMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Enter meeting link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.meetingLink)}
      >
        <Input
          placeholder="Meeting Link"
          className="bg-slate-700 border-none 
            focus-visible:ring-slate-600 
            focus-visible:ring-offset-0"
          onChange={(e) =>
            setValues({ ...values, meetingLink: e.target.value })
          }
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeCategory;
