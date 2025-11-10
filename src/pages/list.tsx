import StreamerCard from "../components/StreamerCard";

const streamers = [
  {
    name: "Alex",
    platform: "Kick",
    status: "offline",
    lastOnline: "56 minutes ago",
    profileUrl: "https://kick.com/monkeykingcobra",
    avatarUrl: " " ,
    pinned: "Last stream: gaming marathon!",
  },
  {
    name: "Mizzy",
    platform: "Twitch",
    status: "live",
    lastOnline: "Now",
    profileUrl: "https://twitch.tv/mizzy",
    avatarUrl:" " ,
  },
  {
    name: "Jane",
    platform: "YouTube",
    status: "offline",
    lastOnline: "5 hours ago",
    profileUrl: "https://youtube.com/@jane",
    pinned: "Special charity event last stream.",
    avatarUrl: " " ,
  },
];

function List() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Streamer List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {streamers.map((s) => (
          <StreamerCard key={s.name} streamer={s} />
        ))}
      </div>
    </div>
  );
}

export default List;