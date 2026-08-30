import React from 'react';

const DeckSlot: React.FC = () => {
    const handleDragStart = (event: React.DragEvent<HTMLImageElement>) => {
        event.dataTransfer.setData("text/plain", "card"); // Use a simple string as the drag data
    };

    return (
        <div className="deck-slot">
            {[...Array(5)].map((_, index) => (
                <img
                    key={index}
                    className="card"
                    src="https://www.deckofcardsapi.com/static/img/back.png"
                    alt="Card Back"
                    draggable={true}
                    onDragStart={handleDragStart} // Drag start event handler
                    style={{ top: `${index * 2}px`, left: `${index * 2}px` }}
                />
            ))}
        </div>
    );
};

export default DeckSlot;