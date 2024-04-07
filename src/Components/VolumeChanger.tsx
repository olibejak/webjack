import React from 'react';
import { MdVolumeUp, MdVolumeDown } from 'react-icons/md';

function VolumeChanger({ volume, onChange }: {volume: number, onChange:(newVolume: number) => void }) {
    const handleVolumeChange = (e: any) => {
        onChange(parseInt(e.target.value));
    };

    return (
        <div className="volume-changer">
            <MdVolumeDown />
            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
            />
            <MdVolumeUp />
        </div>
    );
}

export default VolumeChanger;