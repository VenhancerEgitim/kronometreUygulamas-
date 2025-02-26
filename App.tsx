import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const App = () =>{
  const [seconds,setSEconds] = useState(0); //saniye
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {

    if (isRunning) {
      const id = setInterval(() => {
        setSEconds(prev => prev +1);
      }, 1000);
      setIntervalId(id);
    } else {
      //eğer durduysa interval'i temizle
      clearInterval(intervalId);
    }

    return () => clearInterval (intervalId); //component unmount olduğunda interval temizlenir
  }, [isRunning]);
  //kronometreyi başlatmak durdurmak için
  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
  };


  // kronometreyi sıfırlamak için
const resetTimer = () => {
  setIsRunning(false);
  setSEconds(0);
} ;

return (
  <View style={styles.container}>
    <Text style={styles.timer}>
      {new Date(seconds * 1000).toISOString() .substr(14, 5)} {/* 00:00 format */}
    </Text>
    <View style={styles.buttons}>
      <Button title={isRunning ? 'Dur' : 'Başlat'} onPress={toggleTimer} />
      <Button title="Sıfırla" onPress={resetTimer} />
    </View>
  </View>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default App;