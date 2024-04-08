"use client";
import MeetingSetupScreen from "@/components/MeetingSetupScreen";
import MeetingRoomScreen from "@/components/ui/MeetingRoomScreen";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Using ucstom hook to get the call details
  const { call, isCallLoading } = useGetCallById(id);

  // If user loading or call loading then show loader
  if (!isLoaded || !isCallLoading) return <Loader />;
  return (
    <main className="text-white h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetupScreen /> : <MeetingRoomScreen />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
