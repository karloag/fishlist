
export async function fetchTwitch(username: string): Promise<StreamStatus> {
// Example fetch: replace URL with your backend endpoint
const response = await fetch(`http://localhost:4000/api/twitch/stream/${username}`);
const data = await response.json();

// Assume data shape:
// { stream: {...} } if live, or { stream: null } if offline
const live = data.stream !== null;
return {
  platform: 'twitch',
  username,
  live,
  title: data.stream?.title || null,
  url: `https://twitch.tv/${username}`,
  thumbnail: data.stream?.thumbnail_url || null,
  avatar: data.stream?.avatar || null,
};
}

export async function fetchKick(username: string): Promise<StreamStatus> {
// Example: public API does not require auth
const response = await fetch(`https://kick.com/api/v2/channels/${username}`);
const data = await response.json();

const live = !!data.livestream;
return {
  platform: 'kick',
  username,
  live,
  title: live ? data.livestream.session_title : null,
  url: `https://kick.com/${username}`,
  thumbnail: null, // or data.livestream.thumbnail
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