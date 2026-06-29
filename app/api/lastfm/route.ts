import { NextResponse } from 'next/server';

export async function GET() {
    const API_KEY = '98d68485c02edea181f040c5feda9b5c';
    const USERNAME = 'sameerbagul';
    
    try {
        const res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`, {
            next: { revalidate: 30 } // Cache for 30s to avoid rate limits
        });
        
        if (!res.ok) {
            throw new Error('Failed to fetch from Last.fm');
        }

        const data = await res.json();
        const tracks = data.recenttracks?.track;
        
        if (!tracks || tracks.length === 0) {
            return NextResponse.json({
                name: "No Recent Tracks",
                artist: "Connect Spotify to Last.fm",
                album: "",
                url: "#",
                image: "/music-placeholder.jpg",
                isPlaying: false
            });
        }

        const track = tracks[0];
        const isPlaying = track['@attr']?.nowplaying === 'true';
        
        return NextResponse.json({
            name: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            url: track.url,
            image: track.image[3]['#text'] || track.image[2]['#text'] || '/music-placeholder.jpg',
            isPlaying
        });
    } catch (error) {
        console.error('Last.fm API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
