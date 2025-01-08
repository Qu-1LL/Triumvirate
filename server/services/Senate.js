
class Senate{
    constructor(topRow, bottomRow){
        this.topRow = topRow;
        this.bottomRow = bottomRow;
    }

    elect(column, card){
        let temp = this.bottomRow[column];
        this.bottomRow[column] = this.topRow[column];
        this.topRow[column] = card;
        Deck.discard(temp);
        return;
    }

    impeach(row, col, card) {
        if (row == 0){
            Deck.discard(this.topRow[col]);
            this.topRow[col] = card;
            return;
        } else if (row == 1) {
            Deck.discard(this.bottomRow[col]);
            this.bottomRow[col] = card;
            return;
        } else {
            // >:(
            return;
        }
    }
}