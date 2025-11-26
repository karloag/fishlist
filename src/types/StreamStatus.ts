export type  StreamStatus = {
platform: string;         // e.g., 'twitch', 'kick', 'youtube'
username: string;         // Streamer username or channel ID
live: boolean;            // Is currently live
title: string | null;     // Stream title if live
url: string;              // URL to the stream/channel
thumbnail?: string | null; // Optional stream thumbnail
avatar?: string | null;    // Optional avatar image
error?: string | null;           // Error message if fetch failed
};