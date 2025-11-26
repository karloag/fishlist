import { useState, useEffect } from 'react';
import type { StreamStatus } from '../types';

function StreamerStatus(platform: string, username: string): {status: StreamStatus | null; loading: boolean; error: string|null} {

const [status, setStatus] = useState<StreamStatus | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  // async
  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data: StreamStatus | null = null;

      // Call platform-specific fetchers based on platform argument
      switch (platform.toLowerCase()) { 
        
        case 'twitch':
          data = await fetchTwitch(username);
          break;
        
        case 'kick':
          data = await fetchKick(username);
          break;
        
        case 'youtube':
          data = await fetchYouTube(username);
          break;

        default:
          data = { platform, username, live: false, title: null, url: '', error: 'Unknown platform' };
      }

      // Update state with fetched data
      setStatus(data);
    } catch (err) {
      setError('Failed to fetch data');
      setStatus({
        platform,
        username,
        live: false,
        title: null,
        url: '',
        error: 'Fetch error',
      });
    }
    
    setLoading(false);
  };

  fetchStatus();

  // refresh & cleanup 
  const intervalId = setInterval(fetchStatus, 60000); 
  return () => clearInterval(intervalId);
}, [platform, username]); // Re-run if platform or username changes

// For simplicity, return status object or null
return   {status, loading, error}  ;
}

/* --- Platform-specific fetchers --- */

async function fetchTwitch(username: string): Promise<StreamStatus> {
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

async function fetchKick(username: string): Promise<StreamStatus> {
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

async function fetchYouTube(channelId: string): Promise<StreamStatus> {
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

export default StreamerStatus; 
/* --- Usage in a component 

function StreamerStatusDisplay({ platform, username }: { platform: string; username: string }) {
const status = useStreamerStatus(platform, username);

if (!status) return <div>Loading...</div>;

if (status.error) return <div>Error: {status.error}</div>;

return (
  <div>
    {status.live ? (
      <div>
        <span style={{ color: 'green' }}>● LIVE: {status.title}</span>
      </div>
    ) : (
      <div>
        <span style={{ color: 'gray' }}>Offline</span>
      </div>
    )}
  </div>
);
}
--- */