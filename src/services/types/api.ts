export type TResponse<T> = { success: boolean } & T;
export type TUserResponse = { user: TUser };
export type TTokenResponse = { accessToken: string; refreshToken: string };
export type TMessageResponse = { message: string };
