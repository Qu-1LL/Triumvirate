import { Player } from './player';

export interface Room {
    roomId: string;
    createdAt: Date;
    roomName: string;
    playerCount: Number;
    maxPlayers: Number;
    inProgress: Boolean;
    players: Player[];
    deck: string[];
    turnOrder: string[];
    currentPlayerTurn: string;
}