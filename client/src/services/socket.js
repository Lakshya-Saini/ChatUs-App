import io from "socket.io-client";
import { SOCKET_ENDPOINT } from "../config/config";

const endPoint = SOCKET_ENDPOINT;

export { endPoint, io };
