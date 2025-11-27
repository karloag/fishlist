import {renderHook, act} from '@testing-library/react';
import StreamerStatus from './streamerStatus'
import { fetchTwitch, fetchKick, fetchYouTube } from './api/fetchers';

jest.mock('../fetchers', ()=> ({
    fetchTwitch: jest.fn(),
    fetchKick: jest.fn(),
    fetchYouToube: jest.fn(),
}));

describe ('StreamerStatus Hook', ()=> {
    it('should return loading initially',()=> {
        const {result} = renderHook(() => StreamerStatus('twich','username'));
        expect (result.current.loading).toBe(true);
        expect (result.current.status).toBe(null);
        expect (result.current.error).toBe(null);
    });

    it('should handle succescull fetch',async() => {
        const mockData = {
            platform: 'twitch',
            username: 'username',
            live: true,
            title: 'Live Stream Title',
            url:'https://twitch.tv/username',
            avatar: 'avatar_url' 
        };

        (fetchTwitch as jest.Mock).mockResolvedValueOnce(mockData);// type assertion 
        const { result, waitForNextUpdate } = renderHook(()=> StreamerStatus('twitch','username'));
        await waitForNextUpdate(); //wait for hook re render
        expect(result.current.loading).toBe(false);

    } );
})

    
