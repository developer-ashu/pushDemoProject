
import React from 'react';
import { View,Text } from 'react-native';
import SQLite from 'react-native-sqlite-2'

const db = SQLite.openDatabase('notification.db', '1.0', '', 1);


async function loadNotifications() {
  return new Promise((resolve) => 
  {   
      db.transaction(
          tx => {
            tx.executeSql('select * from Notifications', [], (tx, result) => {
              let row = result.rows;
              resolve(row)
  
              return row
            });
          }
        );
  });  
}

let notification = [];
loadNotifications().then(row => 
  row._array.map(function(item,i){
    notification.push(item)

  }));

const App = () => (
  <View>
    {notification.map((item,i)=><Text>{item.notification_msg}</Text>)}
  </View>
);

export default App;