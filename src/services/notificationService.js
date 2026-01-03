import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

export const getFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;
    const token = await getToken(messaging, {
      vapidKey:
        "BOTP_idjDpA_0sUEvxH0wCKJNKYMthNwK0XVDNE3OY_RxY1wTPh021sKrK-vuhyAtb5mfupK1RO8rIHrq93hVes",
    });

    if (token) {
      return token;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return null;
    }
  } catch (error) {
    console.error("FCM error:", error);
  }
};
