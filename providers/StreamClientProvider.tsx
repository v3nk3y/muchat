"use client";
import { tokenProvider } from "@/actions/stream.actions";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  // Define our video client
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  // Get info of current user provided by clerk
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // IF no user exists then exit
    if (!isLoaded || !user) return;
    // IF apikey then throw error
    if (!apiKey) throw new Error("Stream API key missing");

    // Create new stream video client
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id, // user id from clerk
        name: user?.username || user?.id, // Incase no clerk username will use clerk user id
        image: user?.imageUrl, // Image from clerk
      },
      // For verify user
      tokenProvider: tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  //   If no video client available return loader
  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
