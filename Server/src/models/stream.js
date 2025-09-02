import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

if (!api_key || !api_secret) {
  throw new Error(
    "STREAM_API_KEY and STREAM_API_SECRET must be set in environment variables"
  );
}

const streamClient = StreamChat.getInstance(api_key, api_secret);
export const upsertStreamUser = async (userdata) => {
  try {
    await streamClient.upsertUsers([userdata]);
    return userdata;
  } catch (error) {
    console.error("Error creating Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const useridString = userId.toString();
    return streamClient.createToken(useridString);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
