import { supabase } from "./supabase";

export interface OrderData {
    items: any[];
    total_amount: number;
    customer_name?: string;
    customer_phone?: string;
}

export const createOrder = async (orderData: OrderData) => {
    try {
        const { data, error } = await supabase
            .from("orders")
            .insert([
                {
                    items: orderData.items,
                    total_amount: orderData.total_amount,
                    customer_name: orderData.customer_name || "Guest",
                    customer_phone: orderData.customer_phone || "000-000-0000",
                    status: "pending",
                },
            ])
            .select();

        if (error) {
            console.error("Supabase insert error:", error);
            return { data: null, error: error.message };
        }
        return { data, error: null };
    } catch (error: any) {
        console.error("Unexpected error in createOrder:", error);
        return { data: null, error: error.message || "Unknown error" };
    }
};
