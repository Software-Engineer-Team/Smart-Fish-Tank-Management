import mqtt from "precompiled-mqtt";
import { REACT_NATIVE_APP_X_AIO_USERNAME } from "@env";
// import { socket } from "./socketio";

const URL = "wss://io.adafruit.com:443/mqtt/";
const TOPICS = [
  `${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/LOG`,
  `${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/CMD`,
];
let client = null;

const onConnect = ({ io_key }) => {
  client = mqtt.connect(URL, {
    username: REACT_NATIVE_APP_X_AIO_USERNAME,
    password: io_key,
  });

  client.on("connect", () => {
    console.log("MQTT client connected.");
    client.subscribe(TOPICS, (err) => {
      if (err) {
        console.error(`Failed to subscribe to topic: ${err}`);
      } else {
        console.log("Subscribed to topic successfully.");
      }
    });
  });

  client.on("error", (err) => {
    console.error("Something went wrong!", err);
  });
};

export { onConnect, client, TOPICS };
