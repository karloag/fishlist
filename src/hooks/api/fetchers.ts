import type { StreamStatus } from "../../types";

export async function fetchTwitch(username: string): Promise<StreamStatus> {
  const response = await fetch(`http://localhost:4000/api/streamer/twitch/${encodeURIComponent(username)}`);
  const data = await response.json();
  //console.log('fetchers.ts Data from server:', data);
  if (!response.ok) {
    return {
    platform: 'twitch',
    username,
    live: false,
    title: null,
    url: `https://twitch.tv/${username}`,
    thumbnail: null,
    avatar: null,
    error: data?.error ?? "Twitch fetching error"
 };
  }
  return {
    platform: 'twitch',
    username,
    live: !!data.live,
    title: data.title ?? null,
    url: `https://twitch.tv/${username}`,
    thumbnail: data.thumbnail ?? null,
    avatar: data.avatar ?? null,
 };
}

export async function fetchKick(username: string): Promise<StreamStatus> {
const response = await fetch(`http://localhost:4000/api/streamer/kick/${username}`);
const data = await response.json();

if (!response.ok) {
  return {
    platform: 'kick',
    username,
    live: false,
    title:  null,
    url: `https://kick.com/${username}`,
    thumbnail: null, 
    avatar: null,
    error: "!response ok brach",
};  
}
const live = !!data.livestream;

return {
  platform: 'kick',
  username: data.user?.username,
  live,
  title: live? data.livestream?.session_title ?? null : null ,
  url: `https://kick.com/${username}`,
  thumbnail: null, 
  avatar: data.user?.profile_pic ?? null,
  error: null,
};
}

export async function fetchYouTube(channelId: string): Promise<StreamStatus> {
const response = await fetch(`http://localhost:4000/api/streamer/youtube/${encodeURIComponent(channelId)}`);
const data = await response.json();
if (!response.ok) {
  return{
    platform: "youtube",
    username: channelId,
    live: false,
    title: null,
    url: `https://youtube.com/channel/${channelId}`,
    thumbnail: null,
    avatar: null,
    error: data?.error ?? "failed to fetch youtube"
  };
}
return {
  platform: 'youtube',
  username: channelId,
  live: !!data.live,       
  title: data.title ?? null,
  url: data.url ?? `https://youtube.com/channel/${channelId}`,
  thumbnail: data.thumbnail ?? null,
  avatar: data.avatar ?? null,
};
}