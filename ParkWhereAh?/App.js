import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "./src/screens/HomeScreen";
import AboutScreen from "./src/screens/AboutScreen";
import FavouriteScreen from './src/screens/FavouriteScreen';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons name="home" size={24} color="black" />
            )
          }}
          />
          <Tab.Screen 
            name="Favourite"
            component={FavouriteScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <MaterialIcons name="favorite" size={24} color="black" />              
              )
            }}
          />
        <Tab.Screen 
          name="About"
          component={AboutScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons name="information-circle" size={24} color="black" />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <App />
  )
}