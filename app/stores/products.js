import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref([]);
  const { $supabase } = useNuxtApp();

  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    const { data, error } = await $supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      loading.value = false;
      return;
    }

    products.value = data || [];
    loading.value = false;
  };

  const uploadProductImage = async (file) => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `product-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await $supabase.storage
      .from("products")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return null;
    }

    const { data } = $supabase.storage.from("products").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addProduct = async (product) => {
    const { data, error } = await $supabase
      .from("products")
      .insert([product])
      .select();

    if (error) {
      console.error("Error adding product:", error);
      return;
    }

    if (data?.[0]) {
      products.value.unshift(data[0]);
    }
  };

  const deleteProduct = async (productId) => {
    const product = products.value.find((p) => p.id === productId);

    const { error } = await $supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Error deleting product:", error);
      return;
    }

    products.value = products.value.filter((p) => p.id !== productId);

    if (
      product?.image &&
      product.image.includes("/storage/v1/object/public/products/")
    ) {
      const path = product.image.split("/products/")[1];
      if (path) {
        await $supabase.storage.from("products").remove([path]);
      }
    }
  };

  const updateProduct = async (productId, updatedData) => {
    const { data, error } = await $supabase
      .from("products")
      .update(updatedData)
      .eq("id", productId)
      .select();

    if (error) {
      console.error("Error updating product:", error);
      return;
    }

    const index = products.value.findIndex((p) => p.id === productId);
    if (index !== -1 && data?.[0]) {
      products.value[index] = data[0];
    }
  };

  const getProductById = (productId) => {
    return products.value.find((p) => String(p.id) === String(productId));
  };

  const decreaseStockAfterOrder = async (items) => {
    for (const item of items) {
      const product = products.value.find(
        (p) => String(p.id) === String(item.id),
      );

      if (!product) continue;

      const newStock = Math.max((product.stock || 0) - item.quantity, 0);

      const { data, error } = await $supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", item.id)
        .select();

      if (error) {
        console.error("Error decreasing stock:", error);
        continue;
      }

      const index = products.value.findIndex(
        (p) => String(p.id) === String(item.id),
      );

      if (index !== -1 && data?.[0]) {
        products.value[index] = data[0];
      }
    }
  };

  return {
    products,
    fetchProducts,
    uploadProductImage,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    decreaseStockAfterOrder,
    loading,
  };
});
