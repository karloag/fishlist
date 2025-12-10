export type  StreamStatus = {
platform: string;         // e.g., 'twitch', 'kick', 'youtube'
username: string;         
live: boolean;            
title: string | null;     
url: string;              
thumbnail?: string | null; 
avatar?: string | null;    
error?: string | null;          
};