import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { storeInfo } from "../services/products";
import { Colors } from "../theme/colors";

export default function StoreInfo() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const handleCall = () => {
    Linking.openURL(`tel:${storeInfo.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${storeInfo.email}`);
  };

  const handleMap = () => {
    (navigation as any).navigate("homeStack", { screen: "map" });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={[Colors.secondary, "#5A0B0B"]} style={[styles.header, { paddingTop: insets.top + 40 }]}>
        <Ionicons name="storefront" size={50} color="#fff" />
        <Text style={styles.storeName}>{storeInfo.name}</Text>
        <Text style={styles.storeDesc}>{storeInfo.description}</Text>
      </LinearGradient>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ติดต่อเรา</Text>

        {/* Phone */}
        <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
          <View style={styles.contactIcon}>
            <Ionicons name="call" size={20} color={Colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>โทรศัพท์</Text>
            <Text style={styles.contactValue}>{storeInfo.phone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
          <View style={styles.contactIcon}>
            <Ionicons name="mail" size={20} color={Colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>อีเมล</Text>
            <Text style={styles.contactValue}>{storeInfo.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Address */}
        <TouchableOpacity style={styles.contactItem} onPress={handleMap}>
          <View style={styles.contactIcon}>
            <Ionicons name="location" size={20} color={Colors.primary} />
          </View>
          <View style={[styles.contactInfo, { flex: 1 }]}>
            <Text style={styles.contactLabel}>ที่อยู่</Text>
            <Text style={styles.contactValue}>{storeInfo.address}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Hours */}
        <View style={styles.contactItem}>
          <View style={styles.contactIcon}>
            <Ionicons name="time" size={20} color={Colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>เวลาเปิดทำการ</Text>
            <Text style={styles.contactValue}>{storeInfo.openHours}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>โทร</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
          <Ionicons name="mail" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>ส่งข้อความ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleMap}>
          <Ionicons name="map" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>แผนที่</Text>
        </TouchableOpacity>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ทำไมเลือกเรา</Text>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={Colors.primary}
            />
          </View>
          <View>
            <Text style={styles.featureTitle}>ของแท้ 100%</Text>
            <Text style={styles.featureDesc}>สินค้าแท้พร้อมใบการันตี</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="pricetag" size={24} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.featureTitle}>ราคาพิเศษ</Text>
            <Text style={styles.featureDesc}>ราคากำลังแข่งขัน</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons
              name="checkmark-done-circle"
              size={24}
              color={Colors.primary}
            />
          </View>
          <View>
            <Text style={styles.featureTitle}>พร้อมบริการหลังการขาย</Text>
            <Text style={styles.featureDesc}>ช่วยเหลือทุกเมื่อ</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  storeName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  storeDesc: {
    color: "#fff",
    marginTop: 5,
    fontSize: 12,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactIcon: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: "center",
    alignItems: "center",
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  featureItem: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    gap: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
