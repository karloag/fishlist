import { useEffect, useState } from "react";

type TwitchStatusProps = {
    username: string;
}

type StreamData = {
    title: string;
    tumbnail_url: string;
}

function TwitchStatus({ username }: TwitchStatusProps) {
  const [stream, setStream] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/twitch/stream/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setStream(data.stream);
        setError(null);
      })
      .catch((err) => setError("Failed to fetch"))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error: {error}</span>;

  return stream ? (
    <span style={{ color: "green" }}>● LIVE: {stream.title}</span>
  ) : (
    <span style={{ color: "gray" }}>Offline</span>
  );
}

export default TwitchStatus;