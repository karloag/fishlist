import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 4000;

// --------- TWITCH FETCHER (requires .env credentials) ----------
async function fetchTwitch(username) {
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const AUTH_TOKEN = process.env.TWITCH_AUTH_TOKEN;

  // Get user info to retrieve user ID
  const userResp = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });
  const userData = await userResp.json();
  if (!userData.data || !userData.data.length)
    return { error: 'Twitch user not found' };
  const userId = userData.data[0].id;

  // Get stream info
  const streamResp = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });
  const streamData = await streamResp.json();
  const stream = streamData.data[0] || null;

  // Return unified format
  return {
    platform: 'Twitch',
    username,
    live: !!stream,
    title: stream?.title || null,
    url: `https://twitch.tv/${username}`,
    avatar: userData.data[0].profile_image_url,
  };
}

// --------- KICK FETCHER (public endpoint, no .env needed) ----------
async function fetchKick(username) {
  const resp = await fetch(`https://kick.com/api/v2/channels/${username}`);
  if (!resp.ok) return { error: 'Kick user not found' };
  const data = await resp.json();
  const live = !!data.livestream;
  return {
    platform: 'Kick',
    username,
    live,
    title: live ? data.livestream.session_title : null,
    url: `https://kick.com/${username}`,
    avatar: data.user?.profile_pic,
  };
}

// --------- YOUTUBE FETCHER (requires API KEY in .env) ----------
async function fetchYouTube(channelId) {
  const YT_API = process.env.YOUTUBE_API_KEY;
  // Fetch active liveBroadcast info
  // NOTE: You must use YouTube's Data API v3 and obtain an API key
  // The following is a minimal live status fetch
  const searchURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${YT_API}`;
  const resp = await fetch(searchURL);
  const data = await resp.json();
  const live = !!(data.items && data.items.length > 0);
  const item = data.items?.[0];

  return {
    platform: 'YouTube',
    username: channelId,
    live,
    title: live ? item.snippet.title : null,
    url: live ? `https://www.youtube.com/watch?v=${item.id.videoId}` : `https://youtube.com/channel/${channelId}`,
    avatar: live ? item.snippet.thumbnails.default.url : null,
  };
}

// ----------- AGNOSTIC ENDPOINT: GET STREAMER STATUS -------------
app.get('/api/streamer/:platform/:id', async (req, res) => {
  const { platform, id } = req.params;
  let result;
  try {
    if (platform === 'twitch') result = await fetchTwitch(id);
    else if (platform === 'kick') result = await fetchKick(id);
    else if (platform === 'youtube') result = await fetchYouTube(id);
    else return res.status(400).json({ error: 'Unsupported platform' });

    if (result?.error) return res.status(404).json(result);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: 'Server unavailable' });
  }
});

// ----------------- START SERVER -----------------------
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

