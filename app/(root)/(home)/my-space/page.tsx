"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Metadata } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Muchat - My Space",
  description:
    "Dedicated Space - Enjoy a dedicated virtual space for instant meetings, readily accessible for anyone with your meeting link.",
};

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-4 xl:flex-row">
      <h1 className="text-lg font-medium text-slate-200 lg:text-xl xl:min-w-32">
        {title}
      </h1>
      <h1 className="truncate text-lg font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const MySpace = () => {
  const router = useRouter();
  const { user } = useUser();
  // Since its personal space, user id can be the meeting id
  const meetingId = user?.id;
  // Meeting link - adding query params my-space for my-space routing
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?my-space=true`;

  // Get stream vieo client
  const client = useStreamVideoClient();

  // Get call details using our custom hook - if any existing
  const { call } = useGetCallById(meetingId!);

  // For starting meeting rrom
  const startRoom = async () => {
    // I fno client or user - exit
    if (!client || !user) return;

    // New call config with default and id
    const newCall = client.call("default", meetingId!);

    if (!call) {
      // Create call
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?my-space=true`);
  };

  // for copy link
  const copyInvitationLink = () => {
    navigator.clipboard.writeText(meetingLink);
    toast({
      title: "Link Copied",
    });
  };

  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-3xl font-bold">My Space 🚀</h1>
      <div className="flex flex-col w-full gap-8 xl:max-w-[900px]">
        <Table title="Room" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-700 hover:bg-blue-800" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-slate-800 hover:bg-slate-900"
          onClick={copyInvitationLink}
        >
          <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
          &nbsp;Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default MySpace;
