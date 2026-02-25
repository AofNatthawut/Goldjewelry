import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../theme/colors";

export default function ProductCard({ product, onPress, onFavorite, onCartPress }: any) {
  if (!product) return null;
  const imageSource = product.image || product.image_url;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <ImageBackground
        source={{ uri: imageSource }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.85)"]}
          style={styles.gradient}
        >
          <View style={styles.topRow}>
            <View style={styles.countBadge}>
              <Ionicons name="people" size={12} color="#fff" />
              <Text style={styles.countText}>{product.reviews || Math.floor(Math.random() * 50) + 10}</Text>
            </View>
            <TouchableOpacity onPress={() => onFavorite(product)} style={styles.favoriteBtn}>
              <Ionicons name="heart" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.categoryText}>{product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "Jewelry"}</Text>
            <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
            
            <View style={styles.priceRow}>
              <Text style={[styles.priceText, { color: Colors.primary }]}>฿{(product.price || 0).toLocaleString()}</Text>
              <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
                <Ionicons name="cart" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 320,
    borderRadius: 32,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: Colors.card,
  },
  imageBackground: {
    flex: 1,
  },
  imageStyle: {
    borderRadius: 32,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  countText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  favoriteBtn: {
    padding: 4,
  },
  content: {
    width: "100%",
  },
  categoryText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  productName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
  },
  cartBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
});

