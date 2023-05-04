import mqtt from "precompiled-mqtt";
import { REACT_NATIVE_APP_X_AIO_USERNAME } from "@env";
// import { socket } from "./socketio";

const URL = "wss://io.adafruit.com:443/mqtt/";
const TOPICS = [`${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/tempstatus`];
let client;

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

const messageHandler = (callBack) => {
  let lastTemp = null;
  let lastLight = null;
  console.log(client);

  client.on("message", (topic, message) => {
    console.log("Message is on " + topic + " topic");
    if (topic === TOPICS[0]) {
      lastTemp = message.toString();
    } else if (topic === TOPICS[1]) {
      lastLight = message.toString();
    }
    callBack(message.toString());

    if (lastTemp !== null && lastLight !== null) {
      // socket.emit("data", {
      //   temp: lastTemp,
      //   light: lastLight,
      //   time: "11:00am",
      // });

      lastTemp = null;
      lastLight = null;
    }
  });
};

export { onConnect, messageHandler, client };
