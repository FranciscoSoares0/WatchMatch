import { Show } from "./shows-response";

export interface AddMatching {
    user2id: string;
    shows: Array<Show>
}

export interface AddMatchingResponse {
    _id: string;
    userId: string;
    user2Id: string;
    shows: Array<Show>;
    user1ApprovedShows: Array<Show>;
    user2ApprovedShows: Array<Show>;
    statusUser1: string;
    statusUser2: string;
}