import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
  const { toggleFavorite, isProductFavorite } = useFavorites();
  const [gold, setGold] = useState<any>(null);
  const [loadingGold, setLoadingGold] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    loadGold(false);
    loadFeatured();

    // Polling Real-time Gold Price every 60 seconds (Silent)
    const interval = setInterval(() => {
      loadGold(true);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadGold = async (silent = false) => {
    try {
      if (!silent) setLoadingGold(true);
      const data = await fetchGoldPrice();
      console.log("Gold data fetched:", data);
      
      if (data) {
        // Only update if price changed to avoid redundant timestamp updates
        setGold((prevGold: any) => {
          if (!prevGold || prevGold.price !== data.price) {
            return data;
          }
          return prevGold;
        });
      } else if (!silent) {
        setGold({
          price: 34500,
          updated: "Offline - ไม่สามารถดึงข้อมูลได้",
        });
      }
    } catch (error) {
      console.error("Load gold error:", error);
    } finally {
      if (!silent) setLoadingGold(false);
    }
  };

  const loadFeatured = () => {
    setFeaturedProducts(products.slice(0, 6));
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
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Premium Unified Header Section */}
        <LinearGradient
          colors={[Colors.secondary, "rgba(90, 11, 11, 0.8)", Colors.background]}
          style={[styles.headerGradient, { paddingTop: insets.top + 50 }]}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.cartIconBtn} onPress={() => (navigation as any).navigate("cart")}>
               <Ionicons name="bag-handle" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContentCenter}>
            <View style={styles.iconCircle}>
              <Ionicons name="diamond" size={36} color={Colors.primary} />
            </View>
            <View style={styles.storeTitleRow}>
              <Text style={styles.headerTitle}>Aoffy</Text>
              <Text style={[styles.headerTitle, { color: Colors.primary }]}> Jewelry</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Authentic 96.5% Gold</Text>
            </View>
            <Text style={styles.headerSubtitleCentered}>Elite Selection & Fine Craftsmanship</Text>
          </View>
        </LinearGradient>

        {/* Gold Price Section */}
        <View style={styles.priceSection}>
           {loadingGold ? (
             <ActivityIndicator color={Colors.primary} style={{ marginVertical: 20 }} />
           ) : (
             <GoldPriceCard 
               price={gold?.price} 
               updated={gold?.updated} 
               spotUsd={gold?.spotUsd} 
               jewelryPrice={gold?.jewelryPrice}
             />
           )}
        </View>

        {/* Services Grid (Enhanced Premium Style) */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>บริการพรีเมียม</Text>
          <View style={styles.servicesGrid}>
            <TouchableOpacity 
              style={styles.serviceItem} 
              onPress={() => (navigation as any).navigate("goldlist")}
            >
              <LinearGradient colors={['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.05)']} style={styles.serviceCard}>
                <View style={[styles.serviceIconCircle, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                  <Ionicons name="cart" size={26} color={Colors.primary} />
                </View>
                <View style={styles.serviceTextGroup}>
                  <Text style={styles.serviceLabel}>สั่งซื้อทอง</Text>
                  <Text style={styles.serviceSubLabel}>เลือกชมความงาม</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.serviceItem} 
              onPress={() => (navigation as any).navigate("savings")}
            >
              <LinearGradient colors={['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.05)']} style={styles.serviceCard}>
                <View style={[styles.serviceIconCircle, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                  <Ionicons name="wallet" size={26} color={Colors.primary} />
                </View>
                <View style={styles.serviceTextGroup}>
                  <Text style={styles.serviceLabel}>ออมทอง</Text>
                  <Text style={styles.serviceSubLabel}>สิทธิพิเศษสะสม</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.serviceItem} 
              onPress={() => (navigation as any).navigate("care")}
            >
              <LinearGradient colors={['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.05)']} style={styles.serviceCard}>
                <View style={[styles.serviceIconCircle, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                  <Ionicons name="sparkles" size={26} color={Colors.primary} />
                </View>
                <View style={styles.serviceTextGroup}>
                  <Text style={styles.serviceLabel}>Jewelry Care</Text>
                  <Text style={styles.serviceSubLabel}>ดูแลเครื่องประดับ</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.serviceItem} 
              onPress={() => (navigation as any).navigate("map")}
            >
              <LinearGradient colors={['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.05)']} style={styles.serviceCard}>
                <View style={[styles.serviceIconCircle, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                  <Ionicons name="location" size={26} color={Colors.primary} />
                </View>
                <View style={styles.serviceTextGroup}>
                  <Text style={styles.serviceLabel}>สาขา</Text>
                  <Text style={styles.serviceSubLabel}>ค้นหาร้านใกล้คุณ</Text>
                </View>
              </LinearGradient>
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
                  product={{
                    ...product,
                    isFavorite: isProductFavorite(product.id)
                  }}
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
  headerGradient: {
    paddingBottom: 50,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 20,
  },
  headerTop: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 10,
  },
  headerContentCenter: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  storeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  badge: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    marginTop: 8,
    marginBottom: 12,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  headerSubtitleCentered: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cartIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  priceSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  servicesSection: {
    paddingHorizontal: 25,
    marginBottom: 40,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  serviceItem: {
    width: '47%',
  },
  serviceCard: {
    padding: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  serviceIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  serviceTextGroup: {
    marginTop: 4,
  },
  serviceLabel: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '800',
  },
  serviceSubLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  productsSection: {
    paddingHorizontal: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  seeAllText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '800',
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
