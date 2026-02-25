import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { categories, getProductsByCategory } from "../services/products";
import { Colors } from "../theme/colors";

export default function GoldList() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { toggleFavorite } = useFavorites();
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
      filtered = filtered.filter(
        (item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()),
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
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>แคตตาล็อก</Text>
        <SearchBar value={search} onChange={setSearch} />
      </View>

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
              product={item}
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
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 15,
  },
  filterSection: {
    paddingBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 120,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
  },
});

