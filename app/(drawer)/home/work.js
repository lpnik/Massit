import { Text, View } from 'react-native';
import { styles } from "c:/OpiskeluEOD/Massit/Styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useState, useEffect, useRef } from 'react';

const Work = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [showDate, setShowDate] = useState(false)
  const today = new Date();

  const [buttonText, setButtonText] = useState('Aloita');
  const [buttonColor, setButtonColor] = useState(colors=['#75F8CC', '#45DCA9', '#13A674']);
  const [buttonRest, setButtonRest] = useState('Tauko');
  const [restColor, setRestColor] = useState(colors=['#77DEEF', '#46BACD', '#1696AB']);
  const [addColor, setAddColor] = useState(colors=['#77DEEF', '#46BACD', '#1696AB']);

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const handleButtonText = () => {
    setButtonText('Lopeta');
  };

  const handleButtonRest = () => {
    setButtonRest('Tauko menossa');
  };
  
  const handleButtonColor = () => {
    setButtonColor(colors=['#F87575', '#DC4545', '#A61313'])
  }

  const handleRestColor = () => {
    setRestColor(colors=['#BE77EF', '#9546CD', '#6B16AB'])
  }

  const handleAddColor = () => {
    setAddColor(colors=['#BE77EF', '#9546CD', '#6B16AB'])
  }

  useEffect(() => {
    const date = today. getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const hours = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
  
    const formattedDate = `${date}.${month}.${year}\n klo ${hours}:${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    setCurrentDate(formattedDate);
    setShowDate(false);
    console.log("currentDate", { currentDate });
  }, []);

  const startShift = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true)
  }

  const pauseShift = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetShift = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  const resumeShift = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor(
        (Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };


  return (

    <View style={styles.container}>
      <Drawer.Screen options={{
        title: "Koti", 
        headerShown: true, 
        headerLeft: () => <DrawerToggleButton/>}} 
      />

      <View style={styles.hero}>
        <Text style={styles.heroText}>Massit</Text>
      </View>


        <View style={styles.buttons}>
            <LinearGradient
              colors={buttonColor}
              style={styles.buttonStart}>  
                <TouchableOpacity
                  style={styles.buttonStart}
                  onPress={() => {
                    setShowDate(true);
                    handleButtonText();
                    handleButtonColor();
                    startShift();
                  }}
                >
                  <Text style={styles.buttonStartText}>{buttonText}</Text>
                </TouchableOpacity>
            </LinearGradient>
              {showDate && (
                <View>
                  <Text>Työvuoro alkoi: {currentDate}</Text>
                  <Text>Työvuoro kestänyt: {time}</Text>
                </View>
              )}
        </View>


        <View style={styles.buttonContainer}>

          <LinearGradient
            colors={restColor}
            style={styles.buttonAdd}>
            <TouchableOpacity 
              style={styles.buttonAdd}
              onPress={() => {
                handleButtonRest();
                handleRestColor();
                pauseShift();
              }}
              >
              <Text style={styles.buttonAddText}>{buttonRest}</Text>
            </TouchableOpacity>
          </LinearGradient>
          

          <LinearGradient
            colors={addColor}
            style={styles.buttonAdd}>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => {
                handleAddColor();
              }}>
              <Text style={styles.buttonAddText}>HCT-</Text>
              <Text style={styles.buttonAddText}>lisä</Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>


    </View>

    );
}

export default Work;

// 190 276 21
// #BE77EF #9546CD #6B16AB