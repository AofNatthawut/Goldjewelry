import React, { createContext, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { getFavorites, saveFavorites } from "../storage/storage";

interface FavoritesContextType {
  favorites: any[];
  loading: boolean;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (product: any) => Promise<boolean>;
  isProductFavorite: (productId: string) => boolean;
  clearFavorites: () => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFavorites();
      setFavorites(data || []);
    } catch (error) {
      console.error("Load favorites error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

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
      return !exists;
    } catch (error) {
      Alert.alert("ผิดพลาด", "ไม่สามารถบันทึกได้");
      return false;
    }
  };

  const clearFavorites = async () => {
    try {
      await saveFavorites([]);
      setFavorites([]);
    } catch (error) {
      Alert.alert("ผิดพลาด", "ไม่สามารถลบคลังข้อมูลได้");
    }
  };

  const isProductFavorite = (productId: string) => {
    return favorites.some((f) => f.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        loadFavorites,
        toggleFavorite,
        isProductFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
