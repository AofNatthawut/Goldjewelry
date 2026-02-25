import { Ionicons } from "@expo/vector-icons";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";

// Import screens
import Cart from "./cart";
import Favorites from "./favorites";
import GoldList from "./goldlist";
import Home from "./index";
import MapScreen from "./map";
import ProductDetail from "./productDetail";
import StoreInfo from "./storeInfo";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: "#8E8E93",
    tabBarStyle: {
      position: "absolute",
      bottom: 25,
      left: 15,
      right: 15,
      backgroundColor: Colors.glass,
      borderRadius: 40,
      height: 75,
      paddingBottom: 15,
      paddingTop: 10,
      borderTopWidth: 1,
      borderColor: Colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 30,
      elevation: 20,
    },
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: "700",
      marginTop: 2,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          title: "หน้าแรก",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="goldlist"
        component={GoldList}
        options={{
          title: "สั่งซื้อทอง",
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          title: "ตะกร้า",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="favorites"
        component={Favorites}
        options={{
          title: "ที่ชอบ",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="storeInfo"
        component={StoreInfo}
        options={{
          title: "ร้านค้า",
          tabBarIcon: ({ color }) => (
            <Ionicons name="storefront-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="tabs" component={TabNavigator} />
          <Stack.Screen
            name="productDetail"
            component={ProductDetail}
            options={{
              headerShown: true,
              headerTitle: "รายละเอียดสินค้า",
              headerBackTitle: "กลับ",
              headerTintColor: Colors.primary,
              headerStyle: { backgroundColor: Colors.background },
              headerTitleStyle: { color: Colors.text },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="map"
            component={MapScreen}
            options={{
              headerShown: true,
              headerTitle: "ค้นหาสาขา",
              headerBackTitle: "กลับ",
              headerTintColor: Colors.primary,
              headerStyle: { backgroundColor: Colors.background },
              headerTitleStyle: { color: Colors.text },
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaProvider>
  );
}
