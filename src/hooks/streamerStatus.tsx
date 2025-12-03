import { useState, useEffect } from 'react';
import type { StreamStatus } from '../types';
import { fetchTwitch,fetchKick,fetchYouTube } from './api/fetchers';

function StreamerStatus(platform: string, username: string): {status: StreamStatus | null; loading: boolean; error: string|null} {

const [status, setStatus] = useState<StreamStatus | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false;
    const fetchStatus = async () => {
      setLoading(true);
      setError(null);
      try {
      let data: StreamStatus | null = null;
      switch (platform) { 
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
      if (!cancelled) {
        setStatus(data);
        setError(data?error??null);
      } 
    } catch (err: any) {
      if (!cancelled) {
        setError(err?.message || "failed to fetch");
        setStatus({ 
        platform,
        username,
        live: false,
        title: null,
        url: '',
        error: err?.message||'Fetch error',
      });
      } }
      finally {
        if (!cancelled) setLoading(false);
        }
    
  };

  fetchStatus();
  const intervalId = setInterval(fetchStatus, 900000); 
  return ()=>{
    cancelled = true;
    clearInterval(intervalId);
  };
}, [platform, username]);

return   {status, loading, error};
}
export default StreamerStatus; 
