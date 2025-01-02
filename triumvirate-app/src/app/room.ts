import { Player } from './player';

export interface Room {
    _id: string;
    roomname: string;
    playercount: number;
    maxplayers: number;
    inprogress: boolean;
    players: string[];
    deck: string[]; 
    treasury: number;
    turnOrder: string[]; 
    currentPlayerTurn: string;
    __v: number;
  }