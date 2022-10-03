export interface AuthResponseData {
    idToken: string;
    username: string;
    id:string
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }