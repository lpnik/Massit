import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function Layout() {
  return (
    <Drawer screenOptions={{ headerShown: false, swipeEdgeWidth: 0 }}>
        <Drawer.Screen 
            name="home" 
            options={{
                drawerLabel: "Koti",
                title: "Koti",
                drawerIcon: ({size}) => <Ionicons name= "md-home" size = {size} color = {"#135771"}/>

        }}
        ></Drawer.Screen>
        <Drawer.Screen 
            name="settings" 
            options={{
                drawerLabel: "Asetukset",
                title: "Asetukset",
                drawerIcon: ({size}) => <Ionicons name= "md-settings" size = {size} color = {"#135771"}/>
        }}
        ></Drawer.Screen>
        <Drawer.Screen 
            name="shifts" 
            options={{
                drawerLabel: "Työvuorot",
                title: "Työvuorot",
                drawerIcon: ({size}) => <MaterialCommunityIcons name= "truck" size = {size} color = {"#135771"}/>
        }}
        ></Drawer.Screen>
    </Drawer>
  );
}
