import { Show } from "./shows-response";

export interface AddMatching {
    user2id: string;
    shows: Array<Show>
}

export interface AddMatchingResponse {
    userId: string;
    user2Id: string;
    shows: Array<Show>;
}