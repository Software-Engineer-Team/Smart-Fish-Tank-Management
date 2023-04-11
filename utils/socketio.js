import { io } from "socket.io-client";
import { REACT_NATIVE_APP_ENDPOINT_SERVER } from "@env";

console.log(REACT_NATIVE_APP_ENDPOINT_SERVER);

const socket = io(REACT_NATIVE_APP_ENDPOINT_SERVER, {
  transports: ["websocket"],
  forceNode: true,
  forceNew: true,
});

socket.on("connect_error", (err) => {
  console.log(err);
  console.log("connect_error due to " + err.message);
});

socket.on("connect", () => {
  console.log("the connection was successfully established");
});

export { socket };
