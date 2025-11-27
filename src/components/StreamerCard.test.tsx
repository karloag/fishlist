import { render, screen } from '@testing-library/react'
import StreamerCard from './StreamerCard';
import type { Streamer } from '../types';

const streamer: Streamer = {
    name: "Binx",
    platform: "Twitch",
    status: "offline",
    lastOnline: "56 minutes ago",
    profileUrl: "https://www.twitch.tv/binxbasilisk",
    avatarUrl: "avatar_url",
    pinned: "Last stream: who knows bro",
};

test ('renders streamer card',()=> {
    render (<StreamerCard streamer={streamer}/>);
    expect(screen.getByText(/Binx/)).ToBeInTheDocument();

} )