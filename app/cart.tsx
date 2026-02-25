import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../hooks/useCart";
import { createOrder } from "../services/orders";
import { Colors } from "../theme/colors";

export default function Cart() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { cartItems, loadCart, removeFromCart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      setIsProcessing(true);
      
      const orderData = {
        items: cartItems,
        total_amount: totalPrice,
        customer_name: "Customer Test", // In a real app, get from auth or form
        customer_phone: "089-123-4567"
      };

      const { data, error } = await createOrder(orderData);

      if (error) {
        Alert.alert("ผิดพลาด", `ไม่สามารถส่งคำสั่งซื้อได้: ${error}`);
        return;
      }

      // Success
      clearCart(); // Clear local cart
      
      Alert.alert(
        "สั่งซื้อสำเร็จ! 🎉",
        "คำสั่งซื้อของคุณถูกส่งเข้าสู่ระบบแล้ว ขอบคุณที่ไว้วางใจเราครับ",
        [{ text: "ตกลง" }]
      );

    } catch (error: any) {
      console.error(error);
      Alert.alert("ผิดพลาด", `เกิดข้อผิดพลาด: ${error.message || "กรุณาลองใหม่อีกครั้ง"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image || item.image_url }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.itemDetailsRow}>
          <Text style={styles.itemPrice}>฿{(item.price || 0).toLocaleString()}</Text>
          <Text style={styles.itemQty}>x{item.quantity}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color={Colors.textSecondary} />
      <Text style={styles.emptyText}>ไม่มีสินค้าในตะกร้า</Text>
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
            <Text style={styles.headerTitle}>ตะกร้าสินค้า</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{cartItems.length} รายการ</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.clearBtn, cartItems.length === 0 && { opacity: 0.3 }]}
            onPress={() => cartItems.length > 0 && Alert.alert("ล้างตะกร้า", "ต้องการลบสินค้าทั้งหมดออกจากตะกร้าใช่หรือไม่?", [
              { text: "ยกเลิก", style: "cancel" },
              { text: "ล้างทั้งหมด", style: "destructive", onPress: clearCart }
            ])}
          >
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
      />

      {cartItems.length > 0 && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 95 }]}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>ยอดรวมทั้งหมด</Text>
            <Text style={styles.totalValue}>฿{(totalPrice || 0).toLocaleString()}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.checkoutBtn, isProcessing && { opacity: 0.7 }]} 
            onPress={handleCheckout}
            disabled={isProcessing}
          >
            <Text style={styles.checkoutBtnText}>
              {isProcessing ? "กำลังประมวลผล..." : "ยืนยันการสั่งซื้อ"}
            </Text>
          </TouchableOpacity>
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
  listContent: {
    padding: 15,
    paddingBottom: 180,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  itemDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 15,
    color: Colors.secondary,
    fontWeight: "800",
  },
  itemQty: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  removeBtn: {
    padding: 8,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
  },
  footer: {
    backgroundColor: Colors.card,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  checkoutBtn: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  checkoutBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
