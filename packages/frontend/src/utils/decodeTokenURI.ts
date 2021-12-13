import { Token } from "../interfaces/Token";

export default function decodeTokenURI(tokenURI: string): Token {
	return JSON.parse(Buffer.from(tokenURI.substring(29), "base64").toString());
}
