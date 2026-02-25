import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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
    (navigation as any).navigate("map");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Premium Header */}
        <LinearGradient
          colors={[Colors.secondary, "rgba(90, 11, 11, 0.8)", Colors.background]}
          style={[styles.header, { paddingTop: insets.top + 60 }]}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="diamond" size={40} color={Colors.primary} />
          </View>
          <Text style={styles.storeName}>{storeInfo.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Authentic 96.5% Gold</Text>
          </View>
          <Text style={styles.storeDesc}>{storeInfo.description}</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Quick Actions */}
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
              <LinearGradient colors={['#2A1A1A', '#1A0A0A']} style={styles.actionIcon}>
                <Ionicons name="call" size={24} color={Colors.primary} />
              </LinearGradient>
              <Text style={styles.actionLabel}>โทรออก</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionBtn} onPress={handleEmail}>
              <LinearGradient colors={['#2A1A1A', '#1A0A1A']} style={styles.actionIcon}>
                <Ionicons name="mail" size={24} color={Colors.primary} />
              </LinearGradient>
              <Text style={styles.actionLabel}>อีเมล</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={handleMap}>
              <LinearGradient colors={['#2A1A1A', '#1A0A1A']} style={styles.actionIcon}>
                <Ionicons name="map" size={24} color={Colors.primary} />
              </LinearGradient>
              <Text style={styles.actionLabel}>แผนที่</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Details */}
          <Text style={styles.sectionTitle}>ที่อยู่และเวลาทำการ</Text>
          <View style={styles.detailCard}>
             <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={20} color={Colors.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>สถานที่ตั้ง</Text>
                  <Text style={styles.detailValue}>{storeInfo.address}</Text>
                </View>
             </View>
             <View style={styles.detailDivider} />
             <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={20} color={Colors.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>เวลาให้บริการ</Text>
                  <Text style={styles.detailValue}>{storeInfo.openHours}</Text>
                </View>
             </View>
          </View>

          {/* Branding Features */}
          <Text style={styles.sectionTitle}>มาตรฐานความเหนือระดับ</Text>
          <View style={styles.featureGrid}>
             <View style={styles.featureItem}>
               <Ionicons name="shield-checkmark" size={28} color={Colors.primary} />
               <Text style={styles.featureTitle}>ของแท้ 100%</Text>
               <Text style={styles.featureDesc}>ตรวจสอบได้ทุกชิ้น</Text>
             </View>
             <View style={styles.featureItem}>
               <Ionicons name="ribbon" size={28} color={Colors.primary} />
               <Text style={styles.featureTitle}>งานฝีมือ</Text>
               <Text style={styles.featureDesc}>ปราณีต มาตรฐานสูง</Text>
             </View>
          </View>

          {/* Contact Button in Flow */}
          <TouchableOpacity 
            style={styles.contactBtnContainer}
            onPress={handleCall}
          >
            <LinearGradient
              colors={[Colors.primary, '#9A7E1C']}
              style={styles.contactGradient}
            >
              <Ionicons name="logo-whatsapp" size={24} color="#fff" />
              <Text style={styles.contactText}>ติดต่อพูดคุยกับเรา</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingBottom: 50,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  storeName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    marginBottom: 15,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  storeDesc: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },
  content: {
    paddingHorizontal: 25,
    marginTop: -30,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  actionBtn: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
    marginTop: 40,
    marginBottom: 15,
  },
  detailCard: {
    backgroundColor: Colors.card,
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '800',
    marginTop: 2,
  },
  detailDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 15,
    marginLeft: 35,
  },
  featureGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  featureItem: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.text,
    marginTop: 10,
  },
  featureDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  contactBtnContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  contactGradient: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  contactText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
