import { JWT } from "next-auth/jwt";
export interface Mytoken extends JWT {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  username: string | undefined;
  accessTokenExpires: number | undefined;
}
