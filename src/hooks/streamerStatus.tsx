import { useState, useEffect } from 'react';
import type { StreamStatus } from '../types';
import { fetchTwitch,fetchKick,fetchYouTube } from './api/fetchers';

function StreamerStatus(platform: string, username: string): {status: StreamStatus | null; loading: boolean; error: string|null} {

const [status, setStatus] = useState<StreamStatus | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {//async
      setLoading(true);
      setError(null);
      try {
      let data: StreamStatus | null = null;

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
      console.log(err)
      setError('Failed to fetch data from setStatus catch!!');
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

// return status object or null
return   {status, loading, error}  ;
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