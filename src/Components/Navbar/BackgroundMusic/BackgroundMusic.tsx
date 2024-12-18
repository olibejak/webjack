import React, {useEffect, useState} from 'react';
import { MdMusicNote, MdMusicOff, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import VolumeChanger from "./VolumeChanger";
import "./BackgroundMusic.css"

function BackgroundMusic() {
    const [audio] = useState(new Audio('/GAMBA.mp3')); // Initialize with the first song
    const [musicOn, setMusicOn] = useState(false);
    const [volume, setVolume] = useState(20); // Initial volume value
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const songs = ['/GAMBA.mp3', '/radio.mp3', '/hrnec.mp3']; // List of audio sources (URLs)

    // Initial volume
    useEffect(() => {
        audio.volume = 0.2;
    }, [audio]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSongEnd = () => {
        playNextSong();
    }

    useEffect(() => {
        // Add event listener for when the current song ends
        audio.addEventListener('ended', handleSongEnd);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            audio.removeEventListener('ended', handleSongEnd);
        };
    }, [audio, handleSongEnd]); // Ensure effect runs when audio changes

    // Play / Pause
    const handleBackgroundMusic = () => {
        if (!musicOn) { // play audio
            audio.play().then();
            setMusicOn(true);
        } else { // pause audio
            audio.pause();
            setMusicOn(false);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        audio.volume = newVolume / 100;
        setVolume(newVolume);
    };

    const playNextSong = () => {
        if (musicOn) {
            const nextIndex = (currentSongIndex + 1) % songs.length;
            audio.src = songs[nextIndex];
            setCurrentSongIndex(nextIndex);
            audio.play().catch(error => {
                console.error('Failed to play next song:', error);
            });
        }
    };

    const playPrevSong = () => {
        if (musicOn) {
            const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            audio.src = songs[prevIndex];
            setCurrentSongIndex(prevIndex);
            audio.play().catch(error => {
                console.error('Failed to play previous song:', error);
            });
        }
    };


    return (
        <div className={"background-music"}>
            <div className={"background-music-buttons"}>
                <button onClick={playPrevSong} className={"music-button"}><MdSkipPrevious /></button>
                <button onClick={handleBackgroundMusic} className={"music-button"}>
                    {musicOn ? <MdMusicNote /> : <MdMusicOff />}
                </button>
                <button onClick={playNextSong} className={"music-button"}><MdSkipNext /></button>
            </div>
            <VolumeChanger volume={volume} onChange={handleVolumeChange} />
        </div>
    );
}

export default BackgroundMusic;