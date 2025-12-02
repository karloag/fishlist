import { useState, useEffect } from 'react';
import type { StreamStatus } from '../types';
import { fetchTwitch,fetchKick,fetchYouTube } from './api/fetchers';

function StreamerStatus(platform: string, username: string): {status: StreamStatus | null; loading: boolean; error: string|null} {

const [status, setStatus] = useState<StreamStatus | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      setError(null);
      try {
      let data: StreamStatus | null = null;
      switch (platform) { 
        case 'twitch':
          data = await fetchTwitch(username);
          console.log("data ",data)
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
      setStatus(data);
    } catch (err) {

      console.log("streamerStatus.tsx fetchStatus() catch block ",err);
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

  const intervalId = setInterval(fetchStatus, 900000); 
  return () => clearInterval(intervalId);
}, [platform, username]); // Re-run if platform or username changes

return   {status, loading, error}  ;
}

export default StreamerStatus; 
