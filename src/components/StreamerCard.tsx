import StreamerStatus from "../hooks/streamerStatus";
import { StreamStatus } from "../hooks/streamerStatus";
import { Streamer } from "../types";


function StreamerCard ({streamer}:{ streamer: Streamer}) {
    const { status, loading, error } = StreamerStatus(streamer.platform.toLowerCase(), streamer.name);

    return(
        <div className="bg-gray 800 rounded-lg p-6 flex flex-col shadow-lg w-full max-w-xs">
            <img
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
                src={streamer.avatarUrl}           
                />
            <div className="flex items-center">
                <span className = "font-semibold text-lg">{streamer.name}</span>
                <span className="text-xs ml-3 px-2 py-1 bg-green-700 rounded-full">{streamer.platform}</span>
            </div>
            <div className="mt-2">
               {loading?(<span className="text-sm text-gray-400">Loading...</span>): error ? 
               (<span className="text-sm text-red-400">Error: {error}</span>) : (
                <span className={`text-sm ${status.live ? 'text-green-400' :'text-gray 400'}`}> 
                {status.live ? "● LIVE:" + status.title: "Offline"}
                </span>
               )} 
             </div> 
             <div className="mt-2 text-xs text-grey-400">
             Last online: {streamer.lastOnline}   
             </div>
             {streamer.pinned && (
                <div className="mt-2 text-xs bg-blue-900 rounded p-2" >
                {streamer.pinned} 
                </div>
             )} 
             <a href={streamer.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-white-600 text-white text-center py-1.5 rounded hover:bg-green-500 block transition">
                Visit Profile
                </a>
        </div >
    );
} 
export default StreamerCard;