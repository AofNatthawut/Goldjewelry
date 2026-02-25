import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { Colors } from "../theme/colors";

export default function Favorites() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { favorites, loadFavorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleProductPress = (product: any) => {
    (navigation as any).navigate("productDetail", { productId: product.id });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Ionicons name="heart-outline" size={60} color={Colors.textSecondary} />
      </View>
      <Text style={styles.emptyTitle}>ยังไม่มีรายการที่ชอบ</Text>
      <Text style={styles.emptySubtitle}>
        คุณยังไม่ได้เลือกสินค้าที่ถูกใจไว้เลย{"\n"}ลองไปดูสินค้าสวยๆ ในร้านดูนะคะ
      </Text>
      <TouchableOpacity
        style={styles.exploreBtn}
        onPress={() => (navigation as any).navigate("goldListStack")}
      >
        <Text style={styles.exploreBtnText}>ไปดูสินค้า</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.secondary, "#5A0B0B"]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.heartIconCircle}>
             <Ionicons name="heart" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.headerTitle}>รายการที่ชอบ</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{favorites.length} รายการ</Text>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <ProductCard
              product={item}
              onPress={() => handleProductPress(item)}
              onFavorite={() => toggleFavorite(item)}
              onCartPress={() => addToCart(item)}
            />
          </View>
        )}
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContent: {
    alignItems: 'center',
    gap: 12,
  },
  heartIconCircle: {
     width: 44,
     height: 44,
     borderRadius: 22,
     backgroundColor: 'rgba(255,255,255,0.15)',
     justifyContent: 'center',
     alignItems: 'center',
     borderWidth: 1,
     borderColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  countText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 110,
  },
  itemWrapper: {
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  exploreBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  exploreBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
