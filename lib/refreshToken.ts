import { JWT } from "next-auth/jwt";
import spotifyWebApi from "./spotify";
import { Mytoken } from "../types/types";
const refreshAccessToken = async (
  token: Mytoken
): Promise<Mytoken | { error: string }> => {
  if (token.accessToken && token.refreshToken) {
    try {
      spotifyWebApi.setAccessToken(token.accessToken);
      spotifyWebApi.setRefreshToken(token.refreshToken);
      const { body: refreshedTokens } =
        await spotifyWebApi.refreshAccessToken();

      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      };
    } catch (error) {
      console.log(error);

      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  } else {
    return { error: "error" };
  }
};
export default refreshAccessToken;
