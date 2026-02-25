import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme/colors";

const { width } = Dimensions.get("window");

export default function GoldPriceCard({ price, updated, spotUsd, jewelryPrice }: any) {
  return (
    <LinearGradient
      colors={["#8B0000", "#D32F2F", "#B71C1C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.glossOverlay} />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="gold" size={24} color={Colors.primary} />
          <Text style={styles.title}>อัตราแลกเปลี่ยนทองคำแท้</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.badgeText}>Live</Text>
        </View>
      </View>

      <View style={styles.dualPriceRow}>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>ทองแท่ง</Text>
          <View style={styles.priceValueRow}>
             <Text style={styles.currencyMini}>฿</Text>
             <Text style={styles.priceTextMain}>
               {price ? Number(price).toLocaleString() : "---,---"}
             </Text>
          </View>
        </View>
        
        <View style={styles.priceDivider} />

        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>ทองรูปพรรณ</Text>
          <View style={styles.priceValueRow}>
             <Text style={styles.currencyMini}>฿</Text>
             <Text style={styles.priceTextMain}>
               {jewelryPrice ? Number(jewelryPrice).toLocaleString() : "---,---"}
             </Text>
          </View>
        </View>
      </View>

      <View style={styles.footerFlex}>
        {spotUsd && (
          <Text style={styles.worldSpotText}>Spot: ${spotUsd}</Text>
        )}
        <View style={styles.timeContainer}>
          <MaterialCommunityIcons name="clock-outline" size={12} color="rgba(255,255,255,0.6)" />
          <Text style={styles.updateTime}>อัปเดต: {updated}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 28,
    width: width - 40,
    alignSelf: "center",
    shadowColor: "#8B0000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
    marginVertical: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  glossOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF4B4B',
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  dualPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  priceItem: {
    flex: 1,
    alignItems: 'center',
  },
  priceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  priceValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencyMini: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '900',
    marginRight: 2,
  },
  priceTextMain: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  priceDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 10,
  },
  footerFlex: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
    paddingTop: 15,
    marginTop: 10,
  },
  worldSpotText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 10,
    fontWeight: '700',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  updateTime: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontWeight: '700',
  },
});
