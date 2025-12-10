import StreamerCard from "../components/StreamerCard";
import Layout from "../components/Layout";


const streamers = [
  /*{
    name: "BinxBasilisk",
    platform: "twitch",
    status: "",
    lastOnline: "",
    profileUrl: "https://www.twitch.tv/Roblox",
    avatarUrl: "" ,
    pinned: "",
  },*/
  {
    name: "chessbrah",
    platform: "kick",
    status: "",
    lastOnline: "",
    profileUrl: "https://kick.com/chessbrah",
    avatarUrl: "" ,
    pinned: "",
  },
  /*{
    name: "Maya",
    platform: "twitch",
    status: "",
    lastOnline: "",
    profileUrl: "https://www.twitch.tv/Maya",
    avatarUrl: "" ,
    pinned: "",
  }*/

];

function List() {
  return (
    <Layout title="List">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {streamers.map((s) => (
          <StreamerCard key={s.name} streamer={{
            ...s,
            status: undefined,
            lastOnline: undefined,
            pinned: undefined,
          }} />
        ))}
        </div>
    </Layout>

  );
}

export default List;

