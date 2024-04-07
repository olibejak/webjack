import React, {useState} from 'react';
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import VolumeChanger from "./VolumeChanger";

function BackgroundMusic() {
    const [audio] = useState(new Audio('/GAMBA.mp3'));
    const [musicOn, setMusicOn] = useState(false);
    const [volume, setVolume] = useState(50); // Initial volume value

    const handleBackgroundMusic = () => {
        if (!musicOn) {
            audio.loop = true;
            audio.play().then();
            setMusicOn(true);
        } else {
            audio.pause();
            setMusicOn(false);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        audio.volume = newVolume / 100;
        setVolume(newVolume);
    };

    return (
        <div className={"background-music"}>
            <button onClick={handleBackgroundMusic} id={"music-button"}>
                {musicOn ? <MdMusicNote /> : <MdMusicOff />}
            </button>
            <VolumeChanger volume={volume} onChange={handleVolumeChange} />
        </div>
    );
}

export default BackgroundMusic;