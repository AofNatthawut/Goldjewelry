import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoldPriceCard from "../components/GoldPriceCard";
import ProductCard from "../components/ProductCard";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { fetchGoldPrice } from "../services/goldapi";
import { products } from "../services/products";
import { Colors } from "../theme/colors";

export default function Home() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { toggleFavorite } = useFavorites();
  const [gold, setGold] = useState<any>(null);
  const [loadingGold, setLoadingGold] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    loadGold();
    loadFeatured();
  }, []);

  const loadGold = async () => {
    try {
      setLoadingGold(true);
      const data = await fetchGoldPrice();
      console.log("Gold data fetched:", data);
      
      if (data) {
        setGold(data);
      } else {
        // Fallback fake data if API fails
        setGold({
          price: 34500, // Example fallback price
          updated: "Offline - ไม่สามารถดึงข้อมูลได้",
        });
      }
    } catch (error) {
      console.error("Load gold error:", error);
    } finally {
      setLoadingGold(false);
    }
  };

  const loadFeatured = () => {
    setFeaturedProducts(products.slice(0, 5));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadGold();
    setRefreshing(false);
  };

  const handleProductPress = (product: any) => {
    (navigation as any).navigate("productDetail", { productId: product.id });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Header Section - Store Name */}
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <View>
            <Text style={styles.headerSubtitle}>ยินดีต้อนรับสู่</Text>
            <View style={styles.storeTitleRow}>
              <Text style={styles.headerTitle}>Aoffy</Text>
              <Text style={[styles.headerTitle, { color: Colors.primary }]}> Jewelry</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.cartIconBtn} onPress={() => (navigation as any).navigate("cart")}>
             <Ionicons name="bag-handle-outline" size={28} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Gold Price Section */}
        <View style={styles.priceSection}>
           <Text style={styles.sectionTitle}>ราคาทองคำวันนี้</Text>
           {loadingGold ? (
             <ActivityIndicator color={Colors.primary} style={{ marginVertical: 20 }} />
           ) : (
             <GoldPriceCard price={gold?.price} updated={gold?.updated} />
           )}
        </View>

        {/* Improved Services Section */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>บริการของเรา</Text>
          <View style={styles.servicesGrid}>
              <TouchableOpacity style={styles.serviceItem}>
                <View style={[styles.serviceIconContainer, { backgroundColor: 'rgba(139, 0, 0, 0.1)' }]}>
                   <Ionicons name="cart" size={26} color={Colors.secondary} />
                </View>
                <Text style={styles.serviceLabel}>สั่งซื้อทอง</Text>
             </TouchableOpacity>
              <TouchableOpacity style={styles.serviceItem}>
                <View style={[styles.serviceIconContainer, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                   <Ionicons name="wallet" size={26} color={Colors.primary} />
                </View>
                <Text style={styles.serviceLabel}>ออมทอง</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.serviceItem}>
                <View style={[styles.serviceIconContainer, { backgroundColor: '#112211' }]}>
                   <Ionicons name="sparkles" size={26} color="#4ADE80" />
                </View>
                <Text style={styles.serviceLabel}>ขัดเงา</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.serviceItem} onPress={() => (navigation as any).navigate("map")}>
                <View style={[styles.serviceIconContainer, { backgroundColor: '#111122' }]}>
                   <Ionicons name="location" size={26} color="#00BFFF" />
                </View>
                <Text style={styles.serviceLabel}>สาขา</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Products Grid */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>สินค้าแนะนำ</Text>
            <TouchableOpacity onPress={() => (navigation as any).navigate("goldlist")}>
              <Text style={styles.seeAllText}>ดูทั้งหมด</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={styles.halfCard}>
                <ProductCard
                  product={product}
                  onPress={() => handleProductPress(product)}
                  onFavorite={toggleFavorite}
                  onCartPress={() => addToCart(product)}
                />
              </View>
            ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 5,
  },
  storeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.text,
  },
  cartIconBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  priceSection: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  servicesSection: {
    paddingHorizontal: 25,
    marginBottom: 35,
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceItem: {
    alignItems: 'center',
    width: '22%',
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  productsSection: {
    paddingHorizontal: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  halfCard: {
    width: '48%',
    marginBottom: 15,
  },
});

