"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  // Check for meeting owner i.e if its local participant and created by and userid is same as created id
  const isMeetingOwner =
    localParticipant &&
    call!.state.createdBy &&
    localParticipant.userId === call!.state.createdBy.id;

  // If not meeting owner - dont show end button
  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call!.endCall();
    router.push("/");
  };

  return (
    <Button onClick={endCall} className="bg-red-500">
      End call for all
    </Button>
  );
};

export default EndCallButton;
