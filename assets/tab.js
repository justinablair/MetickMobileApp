import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageAccount from "../screens/ManageAccount";
import Login from "../screens/Login";

const Tab= createBottomTabNavigator();

const Tabs = () =>{
    return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="ManageAccount" component={ManageAccount} />
      </Tab.Navigator>
    );
}

export default Tabs;