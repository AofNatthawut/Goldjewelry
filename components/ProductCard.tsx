import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../theme/colors";

export default function ProductCard({ product, onPress, onFavorite, onCartPress, isGrid, showDelete }: any) {
  if (!product) return null;
  const imageSource = product.image || product.image_url;

  return (
    <TouchableOpacity 
      style={[styles.card, isGrid && styles.gridCard]} 
      activeOpacity={0.9} 
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: imageSource }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.85)"]}
          style={[styles.gradient, isGrid && styles.gridGradient]}
        >
          <View style={styles.topRow}>
            <View style={[styles.countBadge, isGrid && styles.gridCountBadge]}>
              <Ionicons name="people" size={isGrid ? 10 : 12} color="#fff" />
              <Text style={[styles.countText, isGrid && styles.gridCountText]}>
                {product.reviews || Math.floor(Math.random() * 50) + 10}
              </Text>
            </View>
            <TouchableOpacity onPress={() => onFavorite(product)} style={styles.favoriteBtn}>
              <Ionicons 
                name={showDelete ? "trash-outline" : (product.isFavorite ? "heart" : "heart-outline")} 
                size={isGrid ? 18 : 20} 
                color={showDelete ? Colors.textSecondary : (product.isFavorite ? "#FF4B4B" : "#fff")} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={[styles.categoryText, isGrid && styles.gridCategoryText]}>
              {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "Jewelry"}
            </Text>
            <Text style={[styles.productName, isGrid && styles.gridProductName]} numberOfLines={isGrid ? 1 : 2}>
              {product.name}
            </Text>
            
            <View style={styles.priceRow}>
              <Text style={[
                styles.priceText, 
                { color: Colors.primary },
                isGrid && styles.gridPriceText
              ]}>
                ฿{(product.price || 0).toLocaleString()}
              </Text>
              <TouchableOpacity 
                style={[styles.cartBtn, isGrid && styles.gridCartBtn]} 
                onPress={onCartPress}
              >
                <Ionicons name="cart" size={isGrid ? 16 : 20} color="#fff" />
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
  gridCard: {
    height: 240,
    borderRadius: 24,
    marginBottom: 15,
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
  gridGradient: {
    padding: 12,
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
  gridCountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  countText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  gridCountText: {
    fontSize: 10,
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
  gridCategoryText: {
    fontSize: 10,
    marginBottom: 2,
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
  gridProductName: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
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
  gridPriceText: {
    fontSize: 16,
    fontWeight: "800",
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
  gridCartBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

