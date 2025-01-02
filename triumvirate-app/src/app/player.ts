export interface Player {
    _id: string;
    ishost: boolean;
    hand: string[];
    balance: Number;
    activecards: string[];
    playername: string;
    availableactions: string[];
    __v: number;
}