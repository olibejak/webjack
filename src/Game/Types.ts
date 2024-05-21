export type PlayerJson = {
    id: string;
    name: string;
    chipBalance: number;
};

// Card structure from Deck of Cards API
export type Card = {
    code: string;
    image: string;
    images: CardImages;
    value: string;
    suit: string;
};

type CardImages = {
    svg: string;
    png: string;
}