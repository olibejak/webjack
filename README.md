# Webjack



## Cíl projektu

Cílem projektu bylo vytvořit plně hratelný Black Jack s možností hry vícero hráčů, jejichž postup je ukládán. Ve stávající se nenachází rozšířené aktivity Black Jacku jako např. split nebo double down.

## Popis funkčnosti

- [ ] Stránka se skládá z hlavních dvou komponent - *uvítací formulář a herní stůl* - mezi kterýmí lze navigovat pomocí History APi
- [ ] Uvítací formulář je průběžně validován a ukládán do Local Storage a následně načítán do instancí třídy Player po začátku hry
- [ ] V navbaru se nachází audio přehrávač - použitá hudba je adresována v uvítacím formuláři
- [ ] Líznuté karty jsou animací přiřazeny do hráčova pole
- [ ] Logika hry se nachází ve třídách *Game, AbstractPlayer, Player, Dealer* v adresáři *Game*
- [ ] View hry je řízeno komponentami v adresáři *Components*

## Průběh hry

- [ ] Před začátkem hry je hráčům umožněno zadat sázku
- [ ] Po zahájení hry a rozdání karet je modře zvýrazněn hráč, který je na řadě
- [ ] Hráč, který stojí je zvýrazněn červeně
- [ ] Mimo *HIT* tlačítko lze pro líznutí karty využít Drag&Drop v podobě přetáhnutí karty z balíčku do pole aktivního hráče
- [ ] Ve chvíli, co všichni hráči stojí si dealer dolíže karty a hra je vyhodnocena
- [ ] Po vyhodnocení hry je hráčům ukázán jejich stav a je jim znovu umožněno si vsadit a zahájit hru nebo se vrátit

## Využité zdroje

### Technologie

- [ ] React.js
- [ ] TypeScript

### API

- [ ] [Deck of Cards](https://www.deckofcardsapi.com)