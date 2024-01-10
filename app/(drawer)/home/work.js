import { Text, View } from 'react-native';
import { styles } from '../../../Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useState, useEffect, useRef } from 'react';
import * as SQLite from 'expo-sqlite';

const Work = () => {
  const db = SQLite.openDatabase('shifts.db');
  const [shifts, setShifts] = useState([]);

  const [currentDate, setCurrentDate] = useState('');
  const [showDate, setShowDate] = useState(false)
  const [showInfoShiftStart, setShowInfoShiftStart] = useState(false)
  const [showInfoShiftEnd, setShowInfoShiftEnd] = useState(false)
  const [showInfoRestStart, setShowInfoRestStart] = useState(false)
  const [showInfoRestEnd, setShowInfoRestEnd] = useState(false)
  const today = new Date();

  const [startText, setStartText] = useState('Aloita');
  const [startColor, setStartColor] = useState(['#75F8CC', '#45DCA9', '#13A674']);
  const [restText, setRestText] = useState('Tauko');
  const [restColor, setRestColor] = useState(['#77DEEF', '#46BACD', '#1696AB']);

  const [timeS, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const [timeShift, setTimeShift] = useState(0);
  const [dateShift, setDateShift] = useState(new Date());

  const [currentRestStart, setCurrentRestStart] = useState(0);
  const [restTime, setRestTime] = useState([]);
  const [restRunning, setRestRunning] = useState(false);
  const intervalRest = useRef(null);
  const restTimeRef = useRef(0);
  const [timeRest, setTimeRest] = useState(0);

  const handleStartText = () => {
    setStartText('Lopeta vuoro');
  };

  const handleRestText = () => {
    setRestText('Lopeta tauko');
  };
  
  const handleStartColor = () => {
    setStartColor(['#F87575', '#DC4545', '#A61313']);
  }

  const handleRestColor = () => {
    setRestColor(['#BE77EF', '#9546CD', '#6B16AB']);
  }

  useEffect(() => {
    const date = today. getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const hours = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
  
    const formattedDate = `${date}.${month}.${year} ${hours}:${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    setCurrentDate(formattedDate);
    setShowDate(false);
    console.log("currentDate", { currentDate });
  }, []);

  const addShift = (dateShift, timeS, restTime) => {

    db.transaction(tx => {
      console.log("In SELECT ");
      tx.executeSql(
        'SELECT * FROM shifts WHERE date = ?',
        [dateShift],
        (_, { rows }) => {
          if (rows.length > 0) {
            const existingShift = rows.item(0);
            const updatedTimeShift = existingShift.time + timeS;
            const updatedTimeRest = existingShift.rest + restTime;
            console.log("Before update query");
            tx.executeSql(
              'UPDATE shifts SET time = ?, rest = ?, timeShift = ? WHERE date = ?',
              [updatedTimeShift, updatedTimeRest, dateShift.toISOString()],
              () => console.log('Shift updated', {updatedTimeShift}),
              error => console.log(error)
            );
          } else {
            tx.executeSql(
              'INSERT INTO shifts (date, time, rest) VALUES (?,?,?)',
              [dateShift, timeS, JSON.stringify(restTime)],
              (_, { insertId }) => {
                let existingShifts = [...shifts];
                existingShifts.push({
                  id: insertId,
                  date: dateShift,
                  time: timeS,
                  rest: restTime,
                });
                setShifts(existingShifts);
              },
              error => console.log("INSERT error", error)
            );
          }
        },
        error => console.log("SELECT error", error)
      );
    });
  };

  function startShift() {
    const formattedTime = formatTime(timeS);

    if(!running && !restRunning){
      console.log("Starting shift");
      startTimeRef.current = Date.now() - timeS * 1000;
      intervalRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
      setRunning(true);
      setStartText('Lopeta');
      setStartColor(['#F87575', '#DC4545', '#A61313']);
    }
    else if (running && !restRunning){
      console.log("Stopping shift");
      clearInterval(intervalRef.current);
      setTimeShift(formattedTime);
      setDateShift(new Date());
      setRunning(false);
      setStartText('Vuoro kesti\n');
      setShowInfoShiftStart(false);
      setShowInfoShiftEnd(true);
      setStartColor(['#75F8CC', '#45DCA9', '#13A674']);
      formatTime(timeRest, true);
      console.log("In startShift(): ", {timeS});
      setRestTime([]);
      setCurrentRestStart(0);
      console.log("Before calling addShift", { currentDate, timeS, restTime });
      addShift(currentDate, timeS, restTime);
      console.log("In startShift(): ", {formattedTime}, {restTime})
    }
  }

  function pauseShift() {
    console.log("Entering pauseShift");

    if(running){
      restTimeRef.current = Date.now() - currentRestStart + timeRest;
      intervalRest.current = setInterval(() => {
        setTimeRest(prevTimeRest => prevTimeRest + 1);
      }, 1000);
      clearInterval(intervalRef.current);
      setRestRunning(true);
      setRunning(false);
      setRestText('Lopeta');
      setRestColor(['#BE77EF', '#9546CD', '#6B16AB']);
      setCurrentRestStart(Date.now());
    }
    else{
      startTimeRef.current = Date.now() - timeS * 1000;
      intervalRef.current = setInterval(() => {
        setTime(Math.floor(
          (Date.now() - startTimeRef.current) / 1000));
      }, 1000);
      clearInterval(intervalRest.current);

      const newRestTime = Math.floor((Date.now() - currentRestStart + timeRest) / 1000);
      setRestTime(prevRestTimes => [...prevRestTimes, newRestTime]);

      setCurrentRestStart(0);
      setTimeRest(0);
      setRestRunning(false);
      setRunning(true);
      setRestText('Tauko');
      setShowInfoRestStart(false);
      setShowInfoRestEnd(true);
      setRestColor(['#77DEEF', '#46BACD', '#1696AB']);
      console.log("Before calling addShift (pause)", { currentDate, timeS, restTime });
      addShift(new Date(), timeS, restTime);
      console.log("In pauseShift(); ", {restTime});
    }
    console.log("Exiting pauseShift");
  };

  let counter = 0;

  const formatTime = (timeInSeconds, resetCounter = false) => {
    if (Array.isArray(timeInSeconds)) {
      return timeInSeconds.map((rest, index) => {
        return `\nTauko ${resetCounter ? ++counter : ''}: ${formatTime(rest, true)}`;
      }).join('');
    }
  
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    return `${resetCounter ? '00' : hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (

    <View style={styles.containerWork}>
      <Drawer.Screen options={{
        title: "Koti", 
        headerShown: true, 
        headerLeft: () => <DrawerToggleButton/>}} 
      />
      <View style={styles.heroWork}>
        <Text style={styles.heroText}>Massit</Text>
      </View>
      <View style={styles.buttons}>
        <LinearGradient
          colors={startColor}
          style={styles.buttonStart}>
            <TouchableOpacity
              style={styles.buttonStart}
              onPress={() => {
                setShowDate(true);
                setShowInfoShiftStart(true);
                handleStartText();
                handleStartColor();
                startShift();
              }}
            >
              <Text style={styles.buttonStartText}>
                {startText} 
                {showInfoShiftStart && (
                  <Text>{'\n'}Kestänyt: {formatTime(timeS)}</Text>
                )}

                {showInfoShiftEnd && (
                  <Text>{timeShift}</Text>
                )}
              </Text>
            </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={restColor}
          style={styles.buttonAdd}>
          <TouchableOpacity 
            style={styles.buttonAdd}
            onPress={() => {
              setShowInfoRestStart(true);
              handleRestText();
              handleRestColor();
              pauseShift();
            }}
            >
            <Text style={styles.buttonAddText}>
              {restText} 
              {showInfoRestStart && (
                <Text>{'\n'}Kestänyt: {formatTime(timeRest)}</Text>
              )}
              {showInfoRestEnd && (
                <Text>{formatTime(restTime, restTime)}</Text>
              )}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
    );
}

export default Work;