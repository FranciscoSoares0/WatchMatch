export interface SendFriendRequest {
    friendEmail: string;
}

export interface SendFriendRequestResponse {
    message: string;
    friendship: {
        _id: string;
        friendId: string;
        friendEmail: string;
        friendName: string;
        friendProfileImage: string;
    }
}