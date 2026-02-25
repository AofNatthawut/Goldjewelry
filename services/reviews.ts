import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";
import { supabase } from "./supabase";

export interface Review {
    id: string;
    product_id: string;
    rating: number;
    comment: string;
    image_url?: string;
    user_name: string;
    created_at: string;
}

export const uploadReviewImage = async (uri: string) => {
    try {
        console.log("Starting upload for URI:", uri);

        // Use expo-file-system for a more reliable read on React Native
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: 'base64',
        });

        const fileName = `review_${Date.now()}.jpg`;
        const filePath = `${fileName}`;
        const contentType = "image/jpeg";

        // Convert base64 to ArrayBuffer (Supabase storage can take this)
        const { data, error } = await supabase.storage
            .from("product-reviews")
            .upload(filePath, decode(base64), {
                contentType,
            });

        if (error) {
            console.error("Supabase Storage Upload Error:", error);
            throw error;
        }

        console.log("Upload successful, data:", data);

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from("product-reviews")
            .getPublicUrl(filePath);

        console.log("Public URL generated:", publicUrl);
        return publicUrl;
    } catch (error) {
        console.error("Error in uploadReviewImage:", error);
        return null;
    }
};

export const submitReview = async (reviewData: {
    product_id: string;
    rating: number;
    comment: string;
    image_url?: string;
    user_name?: string;
}) => {
    console.log("Submitting review to Supabase:", reviewData);
    const { data, error } = await supabase
        .from("reviews")
        .insert([
            {
                product_id: reviewData.product_id,
                rating: reviewData.rating,
                comment: reviewData.comment,
                image_url: reviewData.image_url,
                user_name: reviewData.user_name || "Guest",
            },
        ])
        .select();

    if (error) {
        console.error("Supabase Review Insert Error:", error);
    } else {
        console.log("Review inserted successfully:", data);
    }

    return { data, error };
};

export const getProductReviews = async (productId: string) => {
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

    return { data, error };
};
