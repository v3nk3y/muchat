"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetupScreen = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const call = useCall();
  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call?.camera, call?.microphone]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen w-full text-white">
      <h1 className="text-center text-xl font-bold">Meeting Setup...</h1>
      <VideoPreview />
      <div className="flex items-center justify-center gap-3 h-16">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-600 px-4 py-2"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetupScreen;
