import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme/colors";

const { width } = Dimensions.get("window");

export default function GoldPriceCard({ price, updated }: any) {
  return (
    <LinearGradient
      colors={[Colors.card, Colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="gold" size={24} color={Colors.primary} />
          <Text style={styles.title}>ราคาทองวันนี้</Text>
        </View>
        <LinearGradient
          colors={[Colors.secondary, "#8B0000"]}
          style={styles.badge}
        >
          <Text style={styles.badgeText}>Live</Text>
        </LinearGradient>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.currency}>฿</Text>
        <Text style={styles.price}>
          {price ? Number(price).toLocaleString() : "---,---"}
        </Text>
      </View>

      <View style={styles.footer}>
        <MaterialCommunityIcons name="clock-outline" size={14} color={Colors.textSecondary} />
        <Text style={styles.update}>อัปเดตล่าสุด: {updated}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 24,
    width: width - 40,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  currency: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 4,
  },
  price: {
    color: Colors.primary,
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: -1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    paddingTop: 16,
  },
  update: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
  },
});
