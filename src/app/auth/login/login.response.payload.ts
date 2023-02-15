export interface LoginResponsePayload {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  email: string;
}
