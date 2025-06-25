import { Show } from "./shows-response";

export interface Matching {
    _id: string;
    user1Id: string;
    user2Id: string;
    user1Email: string;
    user2Email: string;
    shows: Array<Show>;
    user1ApprovedShows: Array<Show>;
    user2ApprovedShows: Array<Show>;
    statusUser1: string;
    statusUser2: string;
    genres: Array<number>;
    createdAt: string;
    updatedAt: string;
}
