import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Muchat",
  description:
    "Experience secure video calls with screen sharing, chat functionality, and more, all within a user-friendly interface built with Next.js, React, TypeScript, Tailwind CSS and Clerk",
};
const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
