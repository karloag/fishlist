type Streamer = {
    name: string;
    plataform: string;
    status: string;
    lastOnline: string;
    profileUrl: string;
    pinned?: string;
}

function StreamerCard ({streamer}: {streamer:Streamer}){
    return(
        <div className="bg-gray 800 rounded-lg p-6 flex flex-col shadow-lg w-full max-w-xs">
            <div className="flex items-center">
                <span className = "font-semibold text-lg">{streamer.name}</span>
                <span className="text-xs ml-3 px-2 py-1 bg-green-700 rounded-full">{streamer.plataform}</span>
            </div>
            <div className="mt-2"><span className={`text-sm ${
                streamer.status=== "live" 
                ? "text-green-400"
                : "text-gray-400"
            }`} ></span> </div>


        </div >
    )
}