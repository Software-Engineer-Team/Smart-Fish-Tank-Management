import mqtt from "precompiled-mqtt";
// import { socket } from "./socketio";

const URL = "wss://io.adafruit.com:443/mqtt/";
let client = null,
  TOPICS = null;

const onConnect = ({ io_key, username, TPS }) => {
  client = mqtt.connect(URL, {
    username,
    password: io_key,
  });
  TOPICS = TPS;

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
