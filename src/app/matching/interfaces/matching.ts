import { Show } from "./shows-response";

export interface Matching {
    _id: string;
    user1id: string;
    user2id: string;
    shows: Array<Show>;
    user1ApprovedShows: Array<Show>;
    user2ApprovedShows: Array<Show>;
    user1Status: string;
    user2Status: string;
}
