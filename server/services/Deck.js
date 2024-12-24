class Deck{
    constructor(deck)/* The deck is an array of ints corresponding to indexes of Triumvirate.cardTypes */{
        this.deck = deck;
    }

    discard(card){
        this.deck.push(card);
        return;
    }

    draw(){
        return this.deck.shift;
    }
}