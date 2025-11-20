import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 4000;

app.get('/api/twitch/stream/:username', async (req, res) => {
  try{ 
   const username = req.params.username;
   const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
    const AUTH_TOKEN = process.env.TWITCH_AUTH_TOKEN;

  // Get user info
  const userResp = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });
  const userData = await userResp.json();

  if (!userData.data || !userData.data.length){
    const isOffline = true;
    return res.json({ stream: null, offline: isOffline });
  }
  
  const userId = userData.data[0].id;

  // Get stream info
  const streamResp = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });

  const streamData = await streamResp.json();



const isOffline = !streamData.data || streamData.data.length === 0;
res.json({ stream: isOffline ? null : streamData.data[0], offline: isOffline });
} catch (err) {
  console.error(err);
  res.status(500).json({ error:'Server error' });
} 
});


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});


