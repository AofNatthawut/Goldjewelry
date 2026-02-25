import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";

export default function SavingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const benefits = [
    {
      icon: "trending-up",
      title: "ชนะเงินเฟ้อ",
      desc: "รักษามูลค่าเงินของคุณด้วยทรัพย์สินที่มั่นคงที่สุด"
    },
    {
      icon: "shield-checkmark",
      title: "ความเสี่ยงต่ำ",
      desc: "ทองคำแท้ 96.5% มาตรฐานสมาคมค้าทองคำ"
    },
    {
      icon: "phone-portrait",
      title: "เริ่มง่าย",
      desc: "ออมผ่านแอปได้ทุกที่ เริ่มต้นเพียงหลักร้อย"
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen 
        options={{ 
          headerShown: true, 
          headerTitle: "ออมทองพรีเมียม",
          headerTransparent: true,
          headerTintColor: Colors.white,
          headerBackTitle: "กลับ"
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.secondary, Colors.background]}
          style={[styles.header, { paddingTop: insets.top + 60 }]}
        >
          <View style={styles.iconBox}>
            <Ionicons name="wallet" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.title}>สะสมความมั่งคั่ง</Text>
          <Text style={styles.subtitle}>เริ่มต้นวางแผนอนาคตด้วยทองคำแท้</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ทำไมต้องออมทองกับเรา?</Text>
            {benefits.map((item, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
                </View>
                <View style={styles.benefitText}>
                  <Text style={styles.benefitTitle}>{item.title}</Text>
                  <Text style={styles.benefitDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.mainBtn}>
            <LinearGradient
              colors={[Colors.primary, "#9A7E1C"]}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>เริ่มออมทันที</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: Colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  content: {
    padding: 24,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 24,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.white,
  },
  benefitDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  mainBtn: {
    height: 60,
    borderRadius: 20,
    overflow: "hidden",
  },
  btnGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "900",
  },
});
