import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = 4000;
app.use(cors({
  origin: 'http://localhost:5173',
}));

async function fetchTwitch(username) {
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const AUTH_TOKEN = process.env.TWITCH_AUTH_TOKEN;

  const userResp = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });
  const responseText = await userResp.text();
  console.log('Raw API Response:', responseText);
  const userData = JSON.parse(responseText);
  const userId = userData.data[0]?.id;
  if (!userData.data || !userData.data.length)
    return { error: 'Twitch user not found' };

  const streamResp = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });
  const streamData = await streamResp.json();
  const stream = streamData.data[0] || null;

  return {
    platform: 'twitch',
    username,
    live: !!stream,
    title: stream?.title || null,
    url: `https://twitch.tv/${username}`,
    avatar: userData.data[0].profile_image_url,
  };
}

async function fetchKick(username) {
  const resp = await fetch(`https://kick.com/api/v2/channels/${username}`);
  if (!resp.ok) return { error: 'Kick user not found' };
  const data = await resp.json();
  const live = !!data.livestream;
  return {
    platform: 'kick',
    username: data.user?.username,
    live: !!data.livestream,
    title: live ? data.livestream?.session_title : null,
    url: `https://kick.com/${data.slug}`,
    avatar: data.user?.profile_pic, 
  };
}

async function fetchYouTube(channelId) {
  const YT_API = process.env.YOUTUBE_API_KEY;
  const searchURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${YT_API}`;
  const resp = await fetch(searchURL);
  const data = await resp.json();
  const item = data.items?.[0];
  const live = !!item;

  return {
    platform: 'youtube ',
    username: channelId,
    live,
    title: live ? item[0].snippet.title : null,
    url: live ? `https://www.youtube.com/watch?v=${item[0].id.videoId}`
              : `https://youtube.com/channel/${channelId}`,
    tumbnail: null,
    avatar: null,
  };
}
 
app.get('/api/streamer/:platform/:id', async (req, res) => {
    const { platform, id } = req.params;
    console.log(`Platform: ${platform}, ID: ${id}`);

    if (!['twitch', 'kick', 'youtube'].includes(platform)) {
        return res.status(400).json({ error: 'Unsupported platform' });
    }

    // Validate ID
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        let result;
        if (platform === 'twitch') result = await fetchTwitch(id);
        else if (platform === 'kick') result = await fetchKick(id);
        else if (platform === 'youtube') result = await fetchYouTube(id);
        if (result?.error) return res.status(404).json(result);
        res.json(result);
    } catch (error) {
        console.error("Error from server.js catch",error); // Log error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

