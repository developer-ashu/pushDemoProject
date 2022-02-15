import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
import SQLite from 'react-native-sqlite-2'

const db = SQLite.openDatabase('notification.db', '1.0', '', 1)

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      db.transaction(function(txn) {
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS Notifications( notification_msg VARCHAR(100))',
          []
        )
        txn.executeSql(
          "INSERT INTO Notifications (notification_msg) VALUES (?)",
          [ notification.data.payload]
      );
      })
    },
  
  
     onRegistrationError: function(err) {
      console.error(err.message, err);
    },

    popInitialNotification: true,
  
    requestPermissions: true,
  });

AppRegistry.registerComponent(appName, () => App);