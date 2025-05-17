import { Friend } from "./friend";

export interface RespondRequest {
    accept:boolean;
}

export interface RespondRequestResponse{
    message:string;
    friendship?:Friend;
}
