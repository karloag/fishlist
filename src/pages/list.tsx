import StreamerCard from "../components/StreamerCard";
import Layout from "../components/Layout";


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
  {
    name: "Jane",
    platform: "YouTube",
    status: "offline",
    lastOnline: "5 hours ago",
    profileUrl: "https://youtube.com/@jane",
    pinned: "Special charity event last stream.",
    avatarUrl: " " ,
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
    <Layout title="List">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {streamers.map((s) => (
          <StreamerCard key={s.name} streamer={s} />
        ))}
        </div>
    </Layout>

  );
}

export default List;

