<template>
  <AdminShell
    :eyebrow="t('admin.products.eyebrow')"
    :title="t('admin.products.title')"
    :description="t('admin.products.desc')"
  >
    <template #actions>
      <BaseButton @click="openAddModal">
        {{ t("admin.products.actions.add") }}
      </BaseButton>
    </template>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AdminMetricCard
        :label="t('admin.products.metrics.total')"
        :value="productsStore.products.length"
        :description="t('admin.products.metrics.totalDesc')"
        tone="brand"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m20.25 7.5-8.25-4.5-8.25 4.5m16.5 0v9l-8.25 4.5m8.25-13.5L12 12m0 9V12M3.75 7.5v9L12 21"
          />
        </svg>
      </AdminMetricCard>

      <AdminMetricCard
        :label="t('admin.products.metrics.inStock')"
        :value="inStockProducts"
        :description="t('admin.products.metrics.inStockDesc')"
        tone="success"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </AdminMetricCard>

      <AdminMetricCard
        :label="t('admin.products.metrics.lowStock')"
        :value="lowStockProducts"
        :description="t('admin.products.metrics.lowStockDesc')"
        tone="warning"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12v-.008Zm8.478 2.467H3.522A1.522 1.522 0 0 1 2 17.478L10.478 2.52a1.75 1.75 0 0 1 3.044 0L22 17.478A1.522 1.522 0 0 1 20.478 19.5Z"
          />
        </svg>
      </AdminMetricCard>

      <AdminMetricCard
        :label="t('admin.products.metrics.discounted')"
        :value="discountedProducts"
        :description="t('admin.products.metrics.discountedDesc')"
        tone="accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.5 7.5-9 9m.75-8.25h.008v.008H8.25V8.25Zm7.5 7.5h.008v.008h-.008v-.008Z"
          />
        </svg>
      </AdminMetricCard>
    </section>

    <BaseCard variant="elevated" padding="lg" class="space-y-6">
      <div
        class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div class="space-y-2">
          <BaseBadge variant="outline" size="md">
            {{ t("admin.products.filters.eyebrow") }}
          </BaseBadge>
          <div class="space-y-1">
            <h2 class="text-2xl font-semibold tracking-tight text-neutral-950">
              {{ t("admin.products.filters.title") }}
            </h2>
            <p class="text-sm leading-6 text-neutral-600">
              {{ t("admin.products.filters.desc") }}
            </p>
          </div>
        </div>

        <BaseBadge variant="outline" size="md">
          {{
            t("admin.products.filters.summary", {
              count: filteredProducts.length,
            })
          }}
        </BaseBadge>
      </div>

      <div class="grid gap-4 xl:grid-cols-[minmax(0,1.2fr),14rem,auto]">
        <BaseInput
          v-model="searchQuery"
          :label="t('admin.products.filters.searchLabel')"
          :placeholder="t('admin.products.filters.searchPlaceholder')"
        >
          <template #leading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-4.35-4.35m0 0A7.65 7.65 0 1 0 5.85 5.85a7.65 7.65 0 0 0 10.8 10.8Z"
              />
            </svg>
          </template>
        </BaseInput>

        <label class="block">
          <span class="ui-field-label">
            {{ t("admin.products.filters.categoryLabel") }}
          </span>
          <select v-model="selectedCategory" class="ui-input-base min-h-11 px-4 text-sm">
            <option value="all">
              {{ t("admin.products.filters.categoryAll") }}
            </option>
            <option
              v-for="category in categories"
              :key="category.value"
              :value="category.value"
            >
              {{ category.label }}
            </option>
          </select>
        </label>

        <div class="flex flex-wrap items-end gap-2">
          <BaseButton variant="outline" @click="resetFilters">
            {{ t("admin.products.actions.reset") }}
          </BaseButton>
          <BaseButton @click="openAddModal">
            {{ t("admin.products.actions.add") }}
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="elevated" padding="none" class="overflow-hidden">
      <div
        class="flex flex-col gap-3 border-b border-neutral-200 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6"
      >
        <div class="space-y-1">
          <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
            {{ t("admin.products.table.title") }}
          </h2>
          <p class="text-sm text-neutral-500">
            {{
              t("admin.products.table.subtitle", {
                count: filteredProducts.length,
              })
            }}
          </p>
        </div>

        <BaseBadge variant="outline" size="md">
          {{ t("admin.products.table.live") }}
        </BaseBadge>
      </div>

      <div v-if="productsStore.loading" class="space-y-4 p-5 md:p-6">
        <div
          v-for="index in 5"
          :key="index"
          class="grid gap-4 rounded-4xl border border-neutral-200 bg-neutral-50/70 p-5 xl:grid-cols-[1.3fr,0.8fr,0.8fr,0.9fr]"
        >
          <BaseSkeleton height="1.125rem" />
          <BaseSkeleton height="1.125rem" />
          <BaseSkeleton height="1.125rem" />
          <BaseSkeleton height="2.75rem" rounded="xl" />
        </div>
      </div>

      <BaseEmptyState
        v-else-if="filteredProducts.length === 0"
        :title="t('admin.products.empty.title')"
        :description="t('admin.products.empty.desc')"
        padding="xl"
      />

      <div v-else>
        <div class="hidden xl:block">
          <div class="grid grid-cols-[1.3fr,0.8fr,0.8fr,0.9fr] gap-4 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span>{{ t("admin.products.table.columns.product") }}</span>
            <span>{{ t("admin.products.table.columns.inventory") }}</span>
            <span>{{ t("admin.products.table.columns.price") }}</span>
            <span>{{ t("admin.products.table.columns.actions") }}</span>
          </div>

          <div class="divide-y divide-neutral-200">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="grid grid-cols-[1.3fr,0.8fr,0.8fr,0.9fr] gap-4 px-6 py-5 transition hover:bg-neutral-50/70"
            >
              <div class="flex items-center gap-4">
                <img
                  :src="product.image || fallbackImage"
                  :alt="product.title"
                  class="h-20 w-20 rounded-3xl object-cover"
                />

                <div class="min-w-0 space-y-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <p class="truncate text-base font-semibold text-neutral-950">
                      {{ product.title }}
                    </p>
                    <BaseBadge variant="outline" size="sm">
                      {{ categoryLabel(product.category) }}
                    </BaseBadge>
                    <BaseBadge
                      v-if="Number(product.discount_percent || 0) > 0"
                      variant="danger"
                      size="sm"
                    >
                      -{{ product.discount_percent }}%
                    </BaseBadge>
                  </div>
                  <p class="line-clamp-2 text-sm leading-6 text-neutral-500">
                    {{ product.description }}
                  </p>
                </div>
              </div>

              <div class="space-y-2">
                <BaseBadge :variant="stockVariant(product.stock)" size="sm">
                  {{ stockLabel(product.stock) }}
                </BaseBadge>
                <p class="text-sm text-neutral-600">
                  {{
                    t("admin.products.table.stockCount", {
                      count: product.stock || 0,
                    })
                  }}
                </p>
              </div>

              <div class="space-y-2">
                <p class="text-lg font-semibold text-neutral-950">
                  {{ finalPrice(product) }} {{ t("productCard.currency") }}
                </p>
                <p
                  v-if="Number(product.discount_percent || 0) > 0"
                  class="text-sm text-neutral-400 line-through"
                >
                  {{ product.price }} {{ t("productCard.currency") }}
                </p>
              </div>

              <div class="flex flex-wrap gap-2">
                <BaseButton
                  size="sm"
                  variant="outline"
                  :to="localePath(`/products/${product.id}`)"
                >
                  {{ t("admin.products.actions.view") }}
                </BaseButton>
                <BaseButton size="sm" variant="secondary" @click="openEditModal(product)">
                  {{ t("admin.products.actions.edit") }}
                </BaseButton>
                <BaseButton size="sm" variant="danger" @click="promptDelete(product)">
                  {{ t("admin.products.actions.delete") }}
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-4 p-5 md:p-6 xl:hidden">
          <BaseCard
            v-for="product in filteredProducts"
            :key="product.id"
            variant="muted"
            padding="lg"
            class="space-y-5"
          >
            <div class="flex items-start gap-4">
              <img
                :src="product.image || fallbackImage"
                :alt="product.title"
                class="h-24 w-24 rounded-3xl object-cover"
              />

              <div class="min-w-0 flex-1 space-y-3">
                <div class="flex flex-wrap items-center gap-2">
                  <p class="text-base font-semibold tracking-tight text-neutral-950">
                    {{ product.title }}
                  </p>
                  <BaseBadge variant="outline" size="sm">
                    {{ categoryLabel(product.category) }}
                  </BaseBadge>
                </div>
                <p class="line-clamp-2 text-sm leading-6 text-neutral-500">
                  {{ product.description }}
                </p>
                <div class="flex flex-wrap items-center gap-3">
                  <BaseBadge :variant="stockVariant(product.stock)" size="sm">
                    {{ stockLabel(product.stock) }}
                  </BaseBadge>
                  <p class="text-sm font-semibold text-neutral-950">
                    {{ finalPrice(product) }} {{ t("productCard.currency") }}
                  </p>
                </div>
              </div>
            </div>

            <div class="grid gap-2 sm:grid-cols-3">
              <BaseButton
                block
                size="sm"
                variant="outline"
                :to="localePath(`/products/${product.id}`)"
              >
                {{ t("admin.products.actions.view") }}
              </BaseButton>
              <BaseButton block size="sm" variant="secondary" @click="openEditModal(product)">
                {{ t("admin.products.actions.edit") }}
              </BaseButton>
              <BaseButton block size="sm" variant="danger" @click="promptDelete(product)">
                {{ t("admin.products.actions.delete") }}
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </BaseCard>

    <BaseModal
      v-model="showModal"
      size="lg"
      :title="
        isEditing
          ? t('admin.products.modal.editTitle')
          : t('admin.products.modal.addTitle')
      "
      :description="t('admin.products.modal.desc')"
    >
      <div class="grid gap-4 md:grid-cols-2">
        <BaseInput
          v-model="form.title"
          :label="t('admin.products.form.title')"
          :placeholder="t('admin.products.form.titlePlaceholder')"
        />

        <BaseInput
          v-model="form.price"
          type="number"
          min="0"
          :label="t('admin.products.form.price')"
          :placeholder="t('admin.products.form.pricePlaceholder')"
        />

        <label class="block">
          <span class="ui-field-label">
            {{ t("admin.products.form.category") }}
          </span>
          <select v-model="form.category" class="ui-input-base min-h-11 px-4 text-sm">
            <option
              v-for="category in categories"
              :key="category.value"
              :value="category.value"
            >
              {{ category.label }}
            </option>
          </select>
        </label>

        <BaseInput
          v-model="form.stock"
          type="number"
          min="0"
          :label="t('admin.products.form.stock')"
          :placeholder="t('admin.products.form.stockPlaceholder')"
        />

        <BaseInput
          v-model="form.discount_percent"
          type="number"
          min="0"
          max="100"
          :label="t('admin.products.form.discount')"
          :placeholder="t('admin.products.form.discountPlaceholder')"
        />

        <label class="block">
          <span class="ui-field-label">
            {{ t("admin.products.form.image") }}
          </span>
          <input
            type="file"
            accept="image/*"
            class="ui-input-base min-h-11 px-4 py-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
            @change="handleImageChange"
          />
        </label>
      </div>

      <BaseInput
        v-model="form.description"
        tag="textarea"
        :rows="5"
        :label="t('admin.products.form.description')"
        :placeholder="t('admin.products.form.descriptionPlaceholder')"
        class="mt-4"
      />

      <div
        v-if="imagePreview"
        class="mt-4 overflow-hidden rounded-4xl border border-neutral-200 bg-neutral-50"
      >
        <img
          :src="imagePreview"
          :alt="form.title || t('admin.products.form.preview')"
          class="aspect-[16/9] w-full object-cover"
        />
      </div>

      <template #footer>
        <BaseButton variant="outline" @click="closeModal">
          {{ t("admin.products.actions.cancel") }}
        </BaseButton>
        <BaseButton :disabled="isUploading || !isFormValid" @click="handleSubmit">
          {{
            isUploading
              ? t("admin.products.states.saving")
              : isEditing
                ? t("admin.products.actions.save")
                : t("admin.products.actions.add")
          }}
        </BaseButton>
      </template>
    </BaseModal>

    <BaseModal
      v-model="showDeleteModal"
      size="sm"
      :title="t('admin.products.delete.title')"
      :description="t('admin.products.delete.desc', { title: deletingProduct?.title || '' })"
    >
      <template #footer>
        <BaseButton variant="outline" @click="showDeleteModal = false">
          {{ t("admin.products.actions.cancel") }}
        </BaseButton>
        <BaseButton variant="danger" @click="confirmDelete">
          {{ t("admin.products.actions.delete") }}
        </BaseButton>
      </template>
    </BaseModal>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="toast"
        class="pointer-events-none fixed inset-x-4 bottom-4 z-[75] flex justify-end"
      >
        <BaseCard
          variant="elevated"
          padding="md"
          class="pointer-events-auto max-w-sm border-l-4"
          :class="toastToneClass"
        >
          <div class="space-y-1">
            <p class="text-sm font-semibold text-neutral-950">
              {{ toast.title }}
            </p>
            <p class="text-sm leading-6 text-neutral-600">
              {{ toast.message }}
            </p>
          </div>
        </BaseCard>
      </div>
    </transition>
  </AdminShell>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "admin"],
});

import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import AdminMetricCard from "~/components/admin/AdminMetricCard.vue";
import AdminShell from "~/components/admin/AdminShell.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseEmptyState from "~/components/ui/BaseEmptyState.vue";
import BaseInput from "~/components/ui/BaseInput.vue";
import BaseModal from "~/components/ui/BaseModal.vue";
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";
import { useProductsStore } from "~/stores/products";

const fallbackImage = "/images/products/towel-1.jpg";

const localePath = useLocalePath();
const { t } = useI18n();
const productsStore = useProductsStore();

const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const editingProductId = ref(null);
const deletingProduct = ref(null);
const isUploading = ref(false);
const selectedImage = ref(null);
const imagePreview = ref("");
const searchQuery = ref("");
const selectedCategory = ref("all");
const toast = ref(null);
let toastTimer;

const form = ref({
  title: "",
  price: "",
  image: "",
  description: "",
  category: "bath",
  stock: 0,
  discount_percent: 0,
});

const categories = computed(() => [
  { value: "bath", label: t("productCategories.bath") },
  { value: "hand", label: t("productCategories.hand") },
  { value: "spa", label: t("productCategories.spa") },
  { value: "sport", label: t("productCategories.sport") },
  { value: "face", label: t("productCategories.face") },
]);

onMounted(async () => {
  await productsStore.fetchProducts();
});

onBeforeUnmount(() => {
  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  revokePreview();
});

const filteredProducts = computed(() => {
  let products = [...productsStore.products];

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    products = products.filter((product) =>
      [product.title, product.description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }

  if (selectedCategory.value !== "all") {
    products = products.filter(
      (product) => product.category === selectedCategory.value,
    );
  }

  return products;
});

const inStockProducts = computed(
  () => productsStore.products.filter((product) => Number(product.stock || 0) > 0).length,
);

const lowStockProducts = computed(
  () =>
    productsStore.products.filter((product) => {
      const stock = Number(product.stock || 0);
      return stock > 0 && stock <= 5;
    }).length,
);

const discountedProducts = computed(
  () =>
    productsStore.products.filter(
      (product) => Number(product.discount_percent || 0) > 0,
    ).length,
);

const isFormValid = computed(
  () =>
    String(form.value.title).trim() &&
    String(form.value.description).trim() &&
    Number(form.value.price) >= 0 &&
    Number(form.value.stock) >= 0,
);

const toastToneClass = computed(() => {
  if (!toast.value) return "border-brand-300";

  switch (toast.value.tone) {
    case "success":
      return "border-success-500";
    case "danger":
      return "border-danger-500";
    default:
      return "border-brand-300";
  }
});

const categoryLabel = (category) => {
  const categoryMap = {
    bath: t("productCategories.bath"),
    hand: t("productCategories.hand"),
    spa: t("productCategories.spa"),
    sport: t("productCategories.sport"),
    face: t("productCategories.face"),
  };

  return categoryMap[category] || category || t("productCategories.all");
};

const stockVariant = (stock) => {
  const normalizedStock = Number(stock || 0);

  if (normalizedStock <= 0) return "danger";
  if (normalizedStock <= 5) return "warning";
  return "success";
};

const stockLabel = (stock) => {
  const normalizedStock = Number(stock || 0);

  if (normalizedStock <= 0) return t("admin.products.stock.out");
  if (normalizedStock <= 5) return t("admin.products.stock.low");
  return t("admin.products.stock.in");
};

const finalPrice = (product) => {
  const basePrice = Number(product.price || 0);
  const discountPercent = Number(product.discount_percent || 0);

  if (discountPercent <= 0) return basePrice;

  return Math.round(basePrice - basePrice * (discountPercent / 100));
};

const openAddModal = () => {
  isEditing.value = false;
  editingProductId.value = null;
  resetForm();
  showModal.value = true;
};

const openEditModal = (product) => {
  isEditing.value = true;
  editingProductId.value = product.id;
  revokePreview();
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

const promptDelete = (product) => {
  deletingProduct.value = product;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (!deletingProduct.value?.id) return;

  await productsStore.deleteProduct(deletingProduct.value.id);
  showDeleteModal.value = false;
  showToast("success", t("admin.products.toast.deletedTitle"), t("admin.products.toast.deletedDesc"));
  deletingProduct.value = null;
};

const handleImageChange = (event) => {
  revokePreview();

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
    image: imageUrl || fallbackImage,
    description: form.value.description,
    category: form.value.category,
    stock: Number(form.value.stock),
    discount_percent: Number(form.value.discount_percent || 0),
  };

  if (isEditing.value && editingProductId.value) {
    await productsStore.updateProduct(editingProductId.value, payload);
    showToast("success", t("admin.products.toast.updatedTitle"), t("admin.products.toast.updatedDesc"));
  } else {
    await productsStore.addProduct(payload);
    showToast("success", t("admin.products.toast.createdTitle"), t("admin.products.toast.createdDesc"));
  }

  closeModal();
  isUploading.value = false;
};

const closeModal = () => {
  resetForm();
  showModal.value = false;
};

const resetForm = () => {
  form.value = {
    title: "",
    price: "",
    image: "",
    description: "",
    category: "bath",
    stock: 0,
    discount_percent: 0,
  };

  revokePreview();
  selectedImage.value = null;
  editingProductId.value = null;
  isEditing.value = false;
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
};

const revokePreview = () => {
  if (imagePreview.value?.startsWith("blob:") && import.meta.client) {
    URL.revokeObjectURL(imagePreview.value);
  }

  imagePreview.value = "";
};

const showToast = (tone, title, message) => {
  toast.value = { tone, title, message };

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toast.value = null;
  }, 2600);
};
</script>
