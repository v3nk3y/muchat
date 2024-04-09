"use client";
import Loader from "@/components/Loader";
import MeetingRoomScreen from "@/components/MeetingRoomScreen";
import MeetingSetupScreen from "@/components/MeetingSetupScreen";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

const Meeting = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Using custom hook to get the call details
  const { call, isCallLoading } = useGetCallById(id);

  // If user not loaded or call loading then show loader
  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetupScreen setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoomScreen />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
