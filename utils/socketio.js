import { Manager } from "socket.io-client";
import { REACT_NATIVE_APP_ENDPOINT_SERVER } from "@env";

const manager = new Manager(`${REACT_NATIVE_APP_ENDPOINT_SERVER}`);

const lightClient = manager.socket("/lightStatus").io;
const tempClient = manager.socket("/tempStatus").io;

const lightHandler = (callback) => {
  lightClient.on("light", (lightStatus) => {
    callback(lightStatus);
  });
};

const tempHandler = (callback) => {
  tempClient.on("temperature", (tempStatus) => {
    callback(tempStatus);
  });
};

export { lightHandler, tempHandler, lightClient, tempClient };
