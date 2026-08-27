# Webjack

Webjack is a shared screen multiplayer Blackjack web application.

## Features

* **State Management & Storage:** The welcome form features continuous validation and saves player data to `localStorage`. This data is loaded into `Player` instances when the game starts.
* **Routing:** Navigation between the Welcome Form and the Game Table is handled via the History API.
* **Interactive UI:** Includes an integrated audio and animations for dealing cards into the player's area.
* **Drag & Drop Mechanic:** Players can request a new card by clicking the *HIT* button or by intuitively dragging a card from the deck directly into their playing area.
* **Architecture:** Core game logic is separated into `Game`, `AbstractPlayer`, `Player`, and `Dealer` classes within the `Game` directory. The UI view is managed by React components in the `Components` directory.

## Gameplay Flow

* Players set their initial bets before the round begins.
* During the game, the currently active player whose turn it is gets highlighted in **blue**.
* Players who have chosen to *Stand* are highlighted in **red**.
* Once all players stand, the Dealer automatically draws their cards, and the round is evaluated.
* After evaluation, players see their updated chip balances and can immediately place new bets for the next round or return to the lobby. Players with zero chips are automatically removed.

## Tech Stack & Resources

* **Frontend:** React.js, TypeScript
* **External APIs:** [Deck of Cards API](https://www.deckofcardsapi.com/)

## Local Development

To run this project locally, ensure you have Node.js installed, then execute the following commands:

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate into the project directory
cd webjack

# Install dependencies
npm install

# Start the development server
npm start

## Acknowledgements
This project was created as a university assignment for the KAJ course at CTU FEE.
