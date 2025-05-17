export interface ResetPassword {
    newPassword: string;
    resetToken: string;
}

export interface ResetPasswordResponse {
    message: string;
}