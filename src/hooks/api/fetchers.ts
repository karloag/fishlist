import process from "process";
import type { StreamStatus } from "../../types";

export async function fetchTwitch(username: string): Promise<StreamStatus> {
  const response = await fetch(`http://localhost:4000/api/streamer/twitch/${username}`);
  if(!response.ok){
    throw new Error ("failed to fetch data from server ");
  }
  const data = await response.json();
  //console.log('fetchers.ts Data from server:', data);
  //unnecessary case
  if (!data.live) {
  return {
  platform: 'twitch',
  username: username,
  live: data.live,
  title: data.title || null,
  url: `https://twitch.tv/${username}`,
  thumbnail: data.thumbnail || null,
  avatar: data.avatar || null,
 };
  }
  return {
  platform: 'twitch',
  username: username,
  live: data.live,
  title: data.title || null,
  url: `https://twitch.tv/${username}`,
  thumbnail: data.thumbnail || null,
  avatar: data.avatar || null,
 };
}

export async function fetchKick(username: string): Promise<StreamStatus> {
const response = await fetch(`https://kick.com/api/v2/channels/${username}`);
const data = await response.json();
const live = !!data.livestream;
return {
  platform: 'kick',
  username: data.user?.username,
  live: !!data.livestream,
  title: live ? data.livestream.session_title : null,
  url: `https://kick.com/${username}`,
  thumbnail: null, 
  avatar: data.user?.profile_pic
};
}

export async function fetchYouTube(channelId: string): Promise<StreamStatus> {
const response = await fetch(``);
const data = await response.json();
const live = data.items?.length > 0;
const firstItem = data.items?.[0];
if (!response.ok) {
  return{
    platform: "youtube",
    username: channelId,
    live: false,
    title: null,
    url: 'https://youtube.com/channel/${channelId}',
    thumbnail: null,
    avatar: null,
    error: data?.error ?? "failed to fetch"

  };
}


return {
  platform: 'youtube',
  username: channelId,
  live: !!data.live,       // data= payloa  d 
  title: data.title ?? null,
  url: data.url ?? `https://youtube.com/channel/${channelId}`,
  thumbnail: data.thumbnail ?? null,
  avatar: data.avatar ?? null,
};
}