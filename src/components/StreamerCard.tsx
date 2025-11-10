type Streamer = {
    name: string;
    platform: string;
    status: string;
    lastOnline: string;
    profileUrl: string;
    avatarUrl: string;
    pinned?: string;
}

function StreamerCard ({streamer}: {streamer:Streamer}){
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
                <span className={ `text-sm ${
                streamer.status=== "live" 
                ? "text-green-400"
                : "text-gray-400"}
                ` }>
                {streamer.status === "live"? "● LIVE":"Offline"}
                </span>
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
                className="mt-4 bg-blue-600 text-white text-center py-1.5 rounded hover:bg-blue-500 block transition">
                Visit Profile
                </a>
        </div >
    );
} 
export default StreamerCard;