import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    Alert,
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
  const { favorites, loadFavorites, toggleFavorite, clearFavorites, loading } = useFavorites();

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleProductPress = (product: any) => {
    (navigation as any).navigate("productDetail", { productId: product.id });
  };

  const handleClearAll = () => {
    if (favorites.length === 0) return;
    
    Alert.alert(
      "ยืนยันการลบ",
      "คุณต้องการลบรายการที่ชอบทั้งหมดใช่หรือไม่?",
      [
        { text: "ยกเลิก", style: "cancel" },
        { 
          text: "ลบทั้งหมด", 
          style: "destructive",
          onPress: clearFavorites
        }
      ]
    );
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
        onPress={() => (navigation as any).navigate("goldlist")}
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
          <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>รายการที่ชอบ</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{favorites.length} รายการ</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.clearBtn, favorites.length === 0 && { opacity: 0.3 }]}
            onPress={handleClearAll}
          >
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {loading && favorites.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <ProductCard
                product={{
                  ...item,
                  isFavorite: true
                }}
                isGrid={true}
                showDelete={true}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 2,
  },
  countText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 10,
    fontWeight: '700',
  },
  clearBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 160,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  itemWrapper: {
    width: '48.5%',
    marginBottom: 5,
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
