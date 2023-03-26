import mqtt from "precompiled-mqtt";
import {
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
} from "@env";

const URL = "wss://io.adafruit.com:443/mqtt/";
const TOPICS = [`${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/yolo-temp`];

const client = mqtt.connect(URL, {
  username: REACT_NATIVE_APP_X_AIO_USERNAME,
  password: REACT_NATIVE_APP_X_AIO_KEY,
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

const messageHandler = (callBack) => {
  client.on("message", (topic, message) => {
    console.log("Message is on " + topic + " topic");
    console.log(message.toString());
    callBack(message.toString());
  });
};

export { client, messageHandler };
