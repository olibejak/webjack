import React from 'react';

export default function DeckSlot() {
    return (
        <div className="deck-slot">
            {[...Array(5)].map((_, index) => (
                <img
                    key={index}
                    className="card"
                    src="https://www.deckofcardsapi.com/static/img/back.png"
                    alt="Card Back"
                    style={{ top: `${index * 2}px`, left: `${index * 2}px` }}
                />
            ))}
        </div>
    );
}