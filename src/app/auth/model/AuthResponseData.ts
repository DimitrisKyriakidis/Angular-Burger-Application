export interface AuthResponseData {
    idToken: string;
    email: string;
    id:string
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }