import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";

export default function CareScreen() {
  const insets = useSafeAreaInsets();

  const tips = [
    {
      title: "ทำความสะอาดเบื้องต้น",
      desc: "ใช้น้ำอุ่นผสมสบู่อ่อนๆ และแปรงขนนุ่มถูเบาๆ เพื่อขจัดคราบเหงื่อ"
    },
    {
      title: "การจัดเก็บที่ถูกต้อง",
      desc: "ควรเก็บแยกชิ้นในถุงผ้าหรือกล่องกำมะหยี่เพื่อป้องกันรอยขีดข่วน"
    },
    {
      title: "เลี่ยงสารเคมี",
      desc: "หลีกเลี่ยงการสัมผัสน้ำหอม สเปรย์ฉีดผม หรือคลอรีนในสระว่ายน้ำ"
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen 
        options={{ 
          headerShown: true, 
          headerTitle: "Jewelry Care",
          headerTransparent: true,
          headerTintColor: Colors.white,
          headerBackTitle: "กลับ"
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#1A2A1A", Colors.background]}
          style={[styles.header, { paddingTop: insets.top + 60 }]}
        >
          <View style={styles.iconBox}>
            <Ionicons name="sparkles" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.title}>ดูแลให้เสมือนใหม่</Text>
          <Text style={styles.subtitle}>เคล็ดลับการรักษาความเงางามของทองคำ</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>การดูแลรักษาเครื่องประดับ</Text>
            {tips.map((item, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.tipText}>
                  <Text style={styles.tipTitle}>{item.title}</Text>
                  <Text style={styles.tipDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.serviceCard}>
             <Ionicons name="construct-outline" size={32} color={Colors.primary} />
             <View style={styles.serviceInfo}>
               <Text style={styles.serviceTitle}>บริการเตรียมเครื่องประดับ</Text>
               <Text style={styles.serviceDesc}>ชุบเงา นำส่งทำความสะอาด โดยช่างผู้ชำนาญการ</Text>
             </View>
          </View>
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
    borderColor: "rgb(66, 212, 55)",
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
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 24,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 2,
  },
  tipNumberText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "900",
  },
  tipText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.white,
  },
  tipDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderStyle: "dashed",
  },
  serviceInfo: {
    marginLeft: 15,
    flex: 1,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.primary,
  },
  serviceDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
