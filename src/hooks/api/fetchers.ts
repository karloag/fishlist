import process from "process";
import type { StreamStatus } from "../../types";

export async function fetchTwitch(username: string): Promise<StreamStatus> {
  const response = await fetch(`http://localhost:4000/api/streamer/twitch/${username}`);
  if(!response.ok){
    throw new Error ("failed to fetch data from server ");
  }
  const data = await response.json();
  //console.log('fetchers.ts Data from server:', data);
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
const API_KEY = process.env.YOUTUBE_API_KEY;
const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${API_KEY}`);
const data = await response.json();

const live = data.items?.length > 0;
const firstItem = data.items?.[0];

return {
  platform: 'youtube',
  username: channelId,
  live,
  title: live ? firstItem.snippet.title : null,
  url: live ? `https://youtube.com/watch?v=${firstItem.id.videoId}` : `https://youtube.com/channel/${channelId}`,
  thumbnail: live ? firstItem.snippet.thumbnails.default.url : null,
};
}