import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddReviewModal from "../components/AddReviewModal";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { getProductById, sampleReviews } from "../services/products";
import { getProductReviews } from "../services/reviews";
import { Colors } from "../theme/colors";

export default function ProductDetail({ route, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { productId } = route.params;
  const { addToCart } = useCart();
  const { favorites, toggleFavorite, loadFavorites } = useFavorites();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const isFavorite = favorites.some((f: any) => f.id === productId);
  
  // Review states
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    loadProduct();
    loadFavorites();
    loadReviews();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const { data, error } = await getProductReviews(productId);
      if (error) throw error;
      
      // Merge with sample reviews for demo if empty
      if (data && data.length > 0) {
        setReviews(data);
      } else {
        setReviews(sampleReviews);
      }
    } catch (error) {
      console.error("Load reviews error:", error);
      setReviews(sampleReviews);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleFavorite = () => {
    toggleFavorite(product);
  };

  if (loading) return <View style={styles.container}><Text style={{textAlign: 'center', marginTop: 50}}>กำลังโหลด...</Text></View>;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image || product.image_url }}
            style={styles.image}
            contentFit="cover"
          />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteBtn} onPress={handleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? Colors.secondary : Colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{product.name}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>96.5% Gold</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>฿{(product.price || 0).toLocaleString()}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color={Colors.primary} />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>รายละเอียด</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.specsContainer}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>น้ำหนัก</Text>
              <Text style={styles.specValue}>{product.weight}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>การันตี</Text>
              <Text style={styles.specValue}>ใบรับรองแท้</Text>
            </View>
          </View>

          <View style={styles.reviewHeaderRow}>
            <Text style={styles.sectionTitle}>รีวิวจากผู้ซื้อ ({reviews.length})</Text>
            <TouchableOpacity 
              style={styles.addReviewBtn}
              onPress={() => setShowReviewModal(true)}
            >
              <Ionicons name="create-outline" size={18} color={Colors.primary} />
              <Text style={styles.addReviewBtnText}>เขียนรีวิว</Text>
            </TouchableOpacity>
          </View>

          {reviews.slice(0, 2).map((review: any) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View>
                  <Text style={styles.reviewAuthor}>{review.user_name || review.author}</Text>
                  <View style={styles.reviewRateRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Ionicons 
                        key={s} 
                        name="star" 
                        size={12} 
                        color={s <= (review.rating || 5) ? Colors.primary : Colors.border} 
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewDate}>
                   {review.created_at ? new Date(review.created_at).toLocaleDateString('th-TH') : review.date}
                </Text>
              </View>
              <Text style={styles.reviewText}>{review.comment || review.text}</Text>
              {review.image_url && (
                <Image 
                  source={{ uri: review.image_url }} 
                  style={styles.reviewImage} 
                  contentFit="cover"
                  transition={200}
                  onError={(err) => console.log("Review image load error:", err)}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 15 }]}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            style={styles.quantityBtn}
          >
            <Ionicons name="remove" size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityBtn}
          >
            <Ionicons name="add" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>เพิ่มเข้าตะกร้า</Text>
        </TouchableOpacity>
      </View>

      {/* Add Review Modal */}
      <AddReviewModal
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        productId={productId}
        onSuccess={loadReviews}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    height: 450,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.glass,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  favoriteBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.glass,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  content: {
    padding: 25,
    marginTop: -30,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: "900",
    color: Colors.text,
    flex: 1,
  },
  badge: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  price: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.secondary,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  ratingText: {
    fontWeight: "800",
    fontSize: 14,
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  specsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  specItem: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  specValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  addReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addReviewBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  reviewItem: {
    marginBottom: 20,
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewAuthor: {
    fontWeight: "700",
    fontSize: 14,
    color: Colors.text,
  },
  reviewRateRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reviewText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  reviewImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    marginTop: 5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
    gap: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quantityBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
    color: Colors.text,
  },
  addButton: {
    flex: 1,
    backgroundColor: Colors.secondary,
    height: 54,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});

