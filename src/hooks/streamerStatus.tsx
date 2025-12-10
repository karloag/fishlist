/* import { useState, useEffect } from 'react';
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
          console.log(data);
          break;
        
        case 'youtube':
          data = await fetchYouTube(username);
          break;

        default:
          data = { platform, username, live: false, title: null, url: '', error: 'Unknown platform' };
      }
      if (!cancelled) {
        setStatus(data);
        setError(data?.error??null);
      } 
    } catch (err: unknown) {
      if (!cancelled) {
      
        const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Failed to fetch";

        setError(message);
        setStatus({ 
        platform,
        username,
        live: false,
        title: null,
        url: '',
        error: message||'Fetch error',
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
export default StreamerStatus;  */

import { useState, useEffect, useRef } from "react";
import type { StreamStatus } from "../types";
import { fetchTwitch, fetchKick, fetchYouTube } from "./api/fetchers";

function StreamerStatus(
  platform: string,
  username: string
): { status: StreamStatus | null; loading: boolean; error: string | null } {
  const [status, setStatus] = useState<StreamStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reqRef = useRef(0);
  const inFlightRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const fetchStatus = async () => {
      if (!username) return;
      if (inFlightRef.current) return; // prevent overlap
      inFlightRef.current = true;
      setLoading(true);
      setError(null);
      const myReq = ++reqRef.current;

      try {
        let data: StreamStatus | null = null;
        switch (platform.toLowerCase()) {
          case "twitch":
            data = await fetchTwitch(username);
            break;
          case "kick":
            data = await fetchKick(username);
            
            break;
          case "youtube":
            data = await fetchYouTube(username);
            break;
          default:
            data = {
              platform,
              username,
              live: false,
              title: null,
              url: "",
              error: "Unknown platform",
            };
        }

        if (cancelled || myReq !== reqRef.current) return;
        if (!data || data.error || !data.username) {
          setError(data?.error|| "Invalid payload");
          return; 
        } 
        console.log('[hook set]', data)
          setStatus(data);
        
      } catch (e: any) {
        if (cancelled || myReq !== reqRef.current) return;
        const msg = e?.message || "Failed to fetch";
        setError(msg);
      } finally {
        if (!cancelled && myReq === reqRef.current) setLoading(false);
        inFlightRef.current = false;
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 60_000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
      reqRef.current++; // invalidate in-flight response
      inFlightRef.current = false;
    };
  }, [platform, username]);

  return { status, loading, error };
}

export default StreamerStatus;