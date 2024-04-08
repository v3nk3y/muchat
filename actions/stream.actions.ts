"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not logged in");
  if (!apiKey) throw new Error("No API key");
  if (!apiSecret) throw new Error("User API Secret");

  //   streamClient coming from nodejs - Refer to API docs of stream:  https://getstream.io/video/docs/api/
  const streamClient = new StreamClient(apiKey, apiSecret);

  // exp is optional (by default the token is valid for an hour)
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(user.id, exp, issued);

  return token;
};

// Note:
// This file is our "Server Action" executes only on server
// That fetches the Stream secret key
// Creates user token - that can be used on StreamVideoProvider
// By thgis way we no need to spin an node express server (as we are using next.js and using this server action)
