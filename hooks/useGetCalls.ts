import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  // Get user details
  const { user } = useUser();
  // Get stream video client for calls
  const client = useStreamVideoClient();
  // For Calls list
  const [calls, setCalls] = useState<Call[]>();
  // For loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      // If no user or client - exit
      if (!client || !user?.id) return;

      // Start loader
      setIsLoading(true);

      // Fetch calls
      // https://getstream.io/video/docs/react/guides/querying-calls/#filters
      try {
        const { calls } = await client.queryCalls({
          // sort by when meetings start (date)
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            //  Filter only those that have 'starts_at'
            starts_at: { $exists: true },
            $or: [
              // Filter by created user (logged in user) or the owner
              { created_by_user_id: user.id },
              // or Filter if logged in user is one of the member of meeting
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  // To determine if the call is ended call or upcoming call based on current time
  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    // If start date is less than current date i.e ended or already ended
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    // If start date is greater than current date i.e upcoming
    return startsAt && new Date(startsAt) > now;
  });

  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
