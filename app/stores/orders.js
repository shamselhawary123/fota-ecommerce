import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref([]);
  const { $supabase } = useNuxtApp();

  const loading = ref(false);

  const fetchOrders = async () => {
    loading.value = true;
    const { data, error } = await $supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      loading.value = false;
      return;
    }

    orders.value = data || [];
    loading.value = false;
  };

  const addOrder = async (userId, items, total, checkoutData) => {
    const newOrder = {
      userId,
      items,
      total,
      status: "pending",
      customer_name: checkoutData.customerName,
      phone: checkoutData.phone,
      address: checkoutData.address,
      city: checkoutData.city,
      notes: checkoutData.notes || "",
      payment_method: checkoutData.paymentMethod || "cod",
      payment_status:
        checkoutData.paymentMethod === "cod" ? "unpaid" : "pending",
    };

    const { data, error } = await $supabase
      .from("orders")
      .insert([newOrder])
      .select();

    if (error) {
      console.error("Error adding order:", error);
      return;
    }

    if (data?.[0]) {
      orders.value.unshift(data[0]);
    }
  };

  const getUserOrders = (userId) => {
    return orders.value.filter(
      (order) => String(order.userId) === String(userId),
    );
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const { data, error } = await $supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId)
      .select();

    if (error) {
      console.error("Error updating order status:", error);
      return;
    }

    const orderIndex = orders.value.findIndex((o) => o.id === orderId);

    if (orderIndex !== -1 && data?.[0]) {
      orders.value[orderIndex] = data[0];
    }
  };

  const updateOrderPaymentStatus = async (orderId, newPaymentStatus) => {
    const { data, error } = await $supabase
      .from("orders")
      .update({ payment_status: newPaymentStatus })
      .eq("id", orderId)
      .select();

    if (error) {
      console.error("Error updating payment status:", error);
      return;
    }

    const orderIndex = orders.value.findIndex((o) => o.id === orderId);

    if (orderIndex !== -1 && data?.[0]) {
      orders.value[orderIndex] = data[0];
    }
  };

  const getAllOrders = () => {
    return orders.value;
  };

  return {
    orders,
    fetchOrders,
    addOrder,
    getUserOrders,
    updateOrderStatus,
    updateOrderPaymentStatus,
    getAllOrders,
    loading,
  };
});
