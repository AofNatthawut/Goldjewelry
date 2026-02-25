import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { getCart, saveCart } from "../storage/storage";

export function useCart() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCart = useCallback(async () => {
        setLoading(true);
        const data = await getCart();
        setCartItems(data || []);
        setLoading(false);
    }, []);

    const addToCart = async (product: any, quantity: number = 1) => {
        try {
            const currentCart = await getCart();
            const existingIndex = currentCart.findIndex((item: any) => item.id === product.id);

            let newCart;
            if (existingIndex >= 0) {
                newCart = [...currentCart];
                newCart[existingIndex].quantity = (newCart[existingIndex].quantity || 1) + quantity;
            } else {
                newCart = [...currentCart, { ...product, quantity }];
            }

            await saveCart(newCart);
            setCartItems(newCart);
            Alert.alert("สำเร็จ", `เพิ่ม ${product.name} ลงตะกร้าแล้ว`);
            return true;
        } catch (error) {
            Alert.alert("ผิดพลาด", "ไม่สามารถเพิ่มลงตะกร้าได้");
            return false;
        }
    };

    const removeFromCart = async (productId: string) => {
        const newList = cartItems.filter((item) => item.id !== productId);
        setCartItems(newList);
        await saveCart(newList);
    };

    const clearCart = async () => {
        await saveCart([]);
        setCartItems([]);
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
    );

    return {
        cartItems,
        loading,
        loadCart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
    };
}
