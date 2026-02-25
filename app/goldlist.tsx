import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { categories, getProductsByCategory, products } from "../services/products";
import { Colors } from "../theme/colors";

export default function GoldList() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { toggleFavorite, isProductFavorite } = useFavorites();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedCategory, search]);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await getProductsByCategory("all");
      setData(result || []);
    } catch (error) {
      console.log("Error loading data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const filterData = async () => {
    let filtered = await getProductsByCategory(selectedCategory);

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (item: any) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          (item.weight && item.weight.toLowerCase().includes(searchLower)) ||
          item.price.toString().includes(searchLower)
      );
    }

    setData(filtered);
  };

  const handleProductPress = (product: any) => {
    (navigation as any).navigate("productDetail", { productId: product.id });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.secondary, "#5A0B0B"]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>คอลเลกชันทองคำ</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>เลือกสรรแล้ว {products.length} รายการ</Text>
            </View>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <SearchBar value={search} onChange={setSearch} />
        </View>
      </LinearGradient>

      <View style={styles.filterSection}>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProductCard
              product={{
                ...item,
                isFavorite: isProductFavorite(item.id)
              }}
              onPress={() => (navigation as any).navigate("productDetail", { productId: item.id })}
              onFavorite={toggleFavorite}
              onCartPress={() => addToCart(item)}
            />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={{ opacity: search.length > 0 ? 0.2 : 1 }}
      />

      {search.length > 0 && (
        <View style={styles.searchOverlay}>
          <View style={styles.overlayHeader}>
            <Text style={styles.resultsCount}>พบ {data.length} รายการ</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => `search-${item.id}`}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <ProductCard
                  product={{
                    ...item,
                    isFavorite: isProductFavorite(item.id)
                  }}
                  onPress={() => (navigation as any).navigate("productDetail", { productId: item.id })}
                  onFavorite={toggleFavorite}
                  onCartPress={() => addToCart(item)}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.overlayListContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={64} color="rgba(255,255,255,0.1)" />
                <Text style={styles.emptyText}>ไม่พบสินค้าที่คุณค้นหา</Text>
              </View>
            }
          />
        </View>
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
    alignItems: 'center',
    marginBottom: 20,
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
  searchContainer: {
    marginTop: 5,
  },
  filterSection: {
    paddingVertical: 15,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 160,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
  },
  searchOverlay: {
    position: 'absolute',
    top: 250, // Updated for premium header height
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    zIndex: 100,
  },
  overlayHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
  overlayListContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 15,
    fontWeight: '600',
  },
});

