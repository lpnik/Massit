import { Text, View } from 'react-native';
import { styles } from "../Styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {


    return (

        <View style={styles.container}>
        <StatusBar style="auto" />
  
        <View style={styles.hero}>
          <Text style={styles.heroText}>Massit</Text>
        </View>

        <View style={styles.buttons}>
            <LinearGradient
              colors={['#75F8CC', '#45DCA9', '#13A674']}
              style={styles.buttonStart}>
              <TouchableOpacity style={styles.buttonStart}>
                <Text style={styles.buttonStartText}>Aloita</Text>
              </TouchableOpacity>
            </LinearGradient>
        </View>

        <View style={styles.buttonContainer}>
            <LinearGradient
              colors={['#77DEEF', '#46BACD', '#1696AB']}
              style={styles.buttonAdd}>
              <TouchableOpacity style={styles.buttonAdd}>
                <Text style={styles.buttonAddText}>HCT-</Text>
                <Text style={styles.buttonAddText}>lisä</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={['#77DEEF', '#46BACD', '#1696AB']}
              style={styles.buttonAdd}>
              <TouchableOpacity style={styles.buttonAdd}>
                <Text style={styles.buttonAddText}>Tauko</Text>
              </TouchableOpacity>
            </LinearGradient>
        </View>

        </View>

        );
}

export default Home;