import { useState, useEffect } from "react";
import { REACT_NATIVE_APP_ENDPOINT_SERVER } from "@env";

const SOCKET_IO_URL = "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

function useSocketIO() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const loadSocketIO = async () => {
      try {
        const response = await fetch(SOCKET_IO_URL);
        const script = await response.text();
        console.log(script);
        eval(script);
        const sk = io(REACT_NATIVE_APP_ENDPOINT_SERVER, {
          transports: ["websocket"],
        });
        setSocket(sk);
      } catch (error) {
        console.error("Error loading Socket.IO:", error);
      }
    };

    loadSocketIO();
  }, []);

  return socket;
}

export { useSocketIO };
