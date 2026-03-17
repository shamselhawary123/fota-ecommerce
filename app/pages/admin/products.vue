<template>
  <ClientOnly>
    <div class="min-h-screen bg-gray-100 p-4 md:p-8">
      <!-- Header -->
      <div
        class="rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-700 text-white p-6 md:p-8 shadow-lg mb-8"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
        >
          <div>
            <p class="text-sm uppercase tracking-widest text-gray-300 mb-2">
              Admin Panel
            </p>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">
              Products Management
            </h1>
            <p class="text-gray-300">
              Add, edit, and organize your products collection.
            </p>
          </div>

          <button
            @click="openAddModal"
            class="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow"
          >
            + Add Product
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="bg-white rounded-3xl shadow p-4 md:p-6 mb-8">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div class="w-full lg:max-w-md">
            <label class="block text-sm font-medium text-gray-600 mb-2">
              Search Products
            </label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title..."
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div class="text-sm text-gray-500">
            Total Products:
            <span class="font-bold text-gray-800">
              {{ filteredProducts.length }}
            </span>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-3xl shadow border border-gray-100 overflow-hidden hover:shadow-xl transition"
        >
          <img
            :src="product.image || 'https://picsum.photos/500/400'"
            class="w-full h-52 object-cover"
          />

          <div class="p-5">
            <div class="flex items-start justify-between gap-3">
              <h2 class="font-bold text-lg text-gray-800 line-clamp-1">
                {{ product.title }}
              </h2>

              <span
                class="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 capitalize whitespace-nowrap"
              >
                {{ product.category }}
              </span>
            </div>

            <p class="text-gray-500 text-sm mt-3 line-clamp-2 min-h-[40px]">
              {{ product.description }}
            </p>

            <p class="font-bold text-xl mt-4">{{ product.price }} EGP</p>

            <p
              class="text-sm mt-1"
              :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'"
            >
              Stock: {{ product.stock }}
            </p>

            <div class="flex gap-2 mt-5">
              <button
                @click="openEditModal(product)"
                class="flex-1 bg-gray-500 text-white px-3 py-2 rounded-xl hover:bg-gray-700 transition"
              >
                Edit
              </button>

              <button
                @click="deleteProduct(product.id)"
                class="flex-1 bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div
        v-else
        class="bg-white rounded-3xl shadow p-10 text-center text-gray-500"
      >
        No products found.
      </div>

      <!-- Add / Edit Modal -->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <div class="bg-white p-6 rounded-3xl w-full max-w-md shadow-xl">
            <h2 class="text-2xl font-bold mb-5">
              {{ isEditing ? "Edit Product" : "Add Product" }}
            </h2>

            <input
              v-model="form.title"
              placeholder="Title"
              class="border w-full p-3 rounded-xl mb-3"
            />

            <input
              v-model="form.price"
              placeholder="Price"
              type="number"
              class="border w-full p-3 rounded-xl mb-3"
            />

            <input
              v-model="form.category"
              placeholder="Category"
              class="border w-full p-3 rounded-xl mb-3"
            />

            <input
              v-model="form.stock"
              placeholder="Stock Quantity"
              type="number"
              min="0"
              class="border w-full p-3 rounded-xl mb-3"
            />

            <input
              v-model="form.discount_percent"
              placeholder="Discount %"
              type="number"
              min="0"
              max="100"
              class="border w-full p-3 rounded-xl mb-3"
            />

            <textarea
              v-model="form.description"
              placeholder="Description"
              class="border w-full p-3 rounded-xl mb-3"
            />

            <input
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="border w-full p-3 rounded-xl mb-3"
            />

            <div v-if="imagePreview" class="mb-4">
              <img
                :src="imagePreview"
                class="w-full h-44 object-cover rounded-xl border"
              />
            </div>

            <div class="flex justify-end gap-3">
              <button
                @click="closeModal"
                class="px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                @click="handleSubmit"
                :disabled="isUploading"
                class="px-5 py-2 bg-black text-white rounded-xl disabled:opacity-50"
              >
                {{
                  isUploading
                    ? isEditing
                      ? "Saving..."
                      : "Uploading..."
                    : isEditing
                      ? "Save Changes"
                      : "Add Product"
                }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "admin"],
});

import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

const showModal = ref(false);
const isEditing = ref(false);
const editingProductId = ref(null);
const isUploading = ref(false);
const selectedImage = ref(null);
const imagePreview = ref("");
const searchQuery = ref("");

const form = ref({
  title: "",
  price: "",
  image: "",
  description: "",
  category: "bath",
  stock: 0,
  discount_percent: 0,
});

onMounted(async () => {
  await productsStore.fetchProducts();
});

const filteredProducts = computed(() => {
  let products = [...productsStore.products];

  if (searchQuery.value.trim()) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  return products;
});

const openAddModal = () => {
  isEditing.value = false;
  editingProductId.value = null;
  form.value = {
    title: "",
    price: "",
    image: "",
    description: "",
    category: "bath",
    stock: 0,
    discount_percent: 0,
  };
  selectedImage.value = null;
  imagePreview.value = "";
  showModal.value = true;
};

const openEditModal = (product) => {
  isEditing.value = true;
  editingProductId.value = product.id;
  form.value = {
    title: product.title || "",
    price: product.price || "",
    image: product.image || "",
    description: product.description || "",
    category: product.category || "bath",
    stock: product.stock ?? 0,
    discount_percent: product.discount_percent ?? 0,
  };
  selectedImage.value = null;
  imagePreview.value = product.image || "";
  showModal.value = true;
};

const handleImageChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  selectedImage.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const handleSubmit = async () => {
  isUploading.value = true;

  let imageUrl = form.value.image || "";

  if (selectedImage.value) {
    imageUrl = await productsStore.uploadProductImage(selectedImage.value);
  }

  const payload = {
    title: form.value.title,
    price: Number(form.value.price),
    image: imageUrl || "https://picsum.photos/400/300",
    description: form.value.description,
    category: form.value.category,
    stock: Number(form.value.stock),
    discount_percent: Number(form.value.discount_percent || 0),
  };

  if (isEditing.value && editingProductId.value) {
    await productsStore.updateProduct(editingProductId.value, payload);
  } else {
    await productsStore.addProduct(payload);
  }

  closeModal();
  isUploading.value = false;
};

const deleteProduct = async (id) => {
  await productsStore.deleteProduct(id);
};

const closeModal = () => {
  form.value = {
    title: "",
    price: "",
    image: "",
    description: "",
    category: "bath",
    stock: 0,
    discount_percent: 0,
  };

  selectedImage.value = null;
  imagePreview.value = "";
  editingProductId.value = null;
  isEditing.value = false;
  showModal.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
