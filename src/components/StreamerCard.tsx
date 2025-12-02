import StreamerStatus from "../hooks/streamerStatus";
import type { Streamer } from "../types";


function StreamerCard ({streamer}:{ streamer: Streamer}) {
    const { status, loading, error } = StreamerStatus(streamer.platform, streamer.name);

    return(
        <div className="bg-gray 800 rounded-lg p-6 flex flex-col shadow-lg w-full max-w-xs">
            <img
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
               src={status?.avatar ?? streamer.avatarUrl ?? undefined}/>
            <div className="flex items-center">
                <span className = "font-semibold text-lg">{streamer.name}</span>
                <span className="text-xs ml-3 px-2 py-1 bg-green-700 rounded-full">{streamer.platform}</span>
            </div> 
            <div className="mt-2">
               {loading?(<span className="text-sm text-gray-400">Loading...</span>): error ? 
               (<span className="text-sm text-red-400">Error: {error}</span>) : (
                <span className={`text-sm ${status!.live ? 'text-green-400' :'text-gray 400'}`}> 
                {status!.live ? "● LIVE: " + status!.title: "Offline"}
                </span>
               )} 
             </div> 
             <div className="mt-2 text-xs text-grey-400"> 
             Last online: {streamer.lastOnline}   
             </div>    
             
        </div >
    );
} 
export default StreamerCard;