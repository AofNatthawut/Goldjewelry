import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { getFavorites, saveFavorites } from "../storage/storage";

export function useFavorites() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const loadFavorites = useCallback(async () => {
        setLoading(true);
        const data = await getFavorites();
        setFavorites(data || []);
        setLoading(false);
    }, []);

    const toggleFavorite = async (product: any) => {
        try {
            const currentFavs = await getFavorites();
            const exists = currentFavs.some((f: any) => f.id === product.id);

            let newFavs;
            if (exists) {
                newFavs = currentFavs.filter((f: any) => f.id !== product.id);
            } else {
                newFavs = [...currentFavs, product];
            }

            await saveFavorites(newFavs);
            setFavorites(newFavs);
            return !exists; // returns true if added, false if removed
        } catch (error) {
            Alert.alert("ผิดพลาด", "ไม่สามารถบันทึกได้");
            return false;
        }
    };

    const isProductFavorite = (productId: string) => {
        return favorites.some((f) => f.id === productId);
    };

    return {
        favorites,
        loading,
        loadFavorites,
        toggleFavorite,
        isProductFavorite,
    };
}
