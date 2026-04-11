<template>
  <AdminShell
    :eyebrow="t('admin.dashboard.eyebrow')"
    :title="t('admin.dashboard.title')"
    :description="t('admin.dashboard.desc')"
  >
    <template #actions>
      <BaseButton variant="outline" :to="localePath('/admin/products')">
        {{ t("admin.dashboard.actions.manageProducts") }}
      </BaseButton>
    </template>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AdminMetricCard
        :label="t('admin.dashboard.metrics.orders')"
        :value="totalOrders"
        :description="t('admin.dashboard.metrics.ordersDesc')"
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
            d="M3.75 6.75h16.5M6.75 3.75v3m10.5-3.75v3M5.25 9.75h13.5A1.5 1.5 0 0 1 20.25 11.25v7.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5Z"
          />
        </svg>
      </AdminMetricCard>

      <AdminMetricCard
        :label="t('admin.dashboard.metrics.revenue')"
        :value="`${totalRevenue} ${t('productCard.currency')}`"
        :description="t('admin.dashboard.metrics.revenueDesc')"
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
            d="M12 6v12m4.5-9.75h-6a2.25 2.25 0 0 0 0 4.5h3a2.25 2.25 0 0 1 0 4.5H7.5"
          />
        </svg>
      </AdminMetricCard>

      <AdminMetricCard
        :label="t('admin.dashboard.metrics.customers')"
        :value="uniqueCustomers"
        :description="t('admin.dashboard.metrics.customersDesc')"
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
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.964 0A9 9 0 1 0 6.018 18.725m11.964 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </AdminMetricCard>

      <AdminMetricCard
        :label="t('admin.dashboard.metrics.units')"
        :value="productUnits"
        :description="t('admin.dashboard.metrics.unitsDesc')"
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
            d="m20.25 7.5-8.25-4.5-8.25 4.5m16.5 0v9l-8.25 4.5m8.25-13.5L12 12m0 9V12M3.75 7.5v9L12 21"
          />
        </svg>
      </AdminMetricCard>
    </section>

    <section class="grid gap-6 2xl:grid-cols-[minmax(0,1.1fr),0.9fr]">
      <BaseCard variant="elevated" padding="lg" class="space-y-6">
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
        >
          <div class="space-y-2">
            <BaseBadge variant="outline" size="md">
              {{ t("admin.dashboard.insights.eyebrow") }}
            </BaseBadge>
            <div class="space-y-1">
              <h2 class="text-2xl font-semibold tracking-tight text-neutral-950">
                {{ t("admin.dashboard.insights.title") }}
              </h2>
              <p class="text-sm leading-6 text-neutral-600">
                {{ t("admin.dashboard.insights.desc") }}
              </p>
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <BaseCard variant="muted" padding="md">
              <p
                class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
              >
                {{ t("admin.dashboard.insights.avgOrder") }}
              </p>
              <p class="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
                {{ averageOrderValue }} {{ t("productCard.currency") }}
              </p>
              <p class="mt-2 text-sm leading-6 text-neutral-500">
                {{ t("admin.dashboard.insights.avgOrderDesc") }}
              </p>
            </BaseCard>

            <BaseCard variant="muted" padding="md">
              <p
                class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
              >
                {{ t("admin.dashboard.insights.fulfillment") }}
              </p>
              <p class="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
                {{ deliveredRate }}%
              </p>
              <p class="mt-2 text-sm leading-6 text-neutral-500">
                {{ t("admin.dashboard.insights.fulfillmentDesc") }}
              </p>
            </BaseCard>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-4">
            <div class="space-y-1">
              <p class="text-sm font-semibold text-neutral-950">
                {{ t("admin.dashboard.insights.statusTitle") }}
              </p>
              <p class="text-sm leading-6 text-neutral-500">
                {{ t("admin.dashboard.insights.statusDesc") }}
              </p>
            </div>

            <div class="space-y-3">
              <div
                v-for="item in statusOverview"
                :key="item.value"
                class="space-y-2"
              >
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <span
                      class="h-2.5 w-2.5 rounded-full"
                      :class="item.dotClass"
                    ></span>
                    <span class="text-sm font-medium text-neutral-700">
                      {{ item.label }}
                    </span>
                  </div>
                  <span class="text-sm font-semibold text-neutral-950">
                    {{ item.count }}
                  </span>
                </div>

                <div class="h-2 rounded-full bg-neutral-100">
                  <div
                    class="h-full rounded-full transition-all duration-300"
                    :class="item.barClass"
                    :style="{ width: progressWidth(item.count) }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-1">
              <p class="text-sm font-semibold text-neutral-950">
                {{ t("admin.dashboard.insights.paymentTitle") }}
              </p>
              <p class="text-sm leading-6 text-neutral-500">
                {{ t("admin.dashboard.insights.paymentDesc") }}
              </p>
            </div>

            <div class="space-y-3">
              <div
                v-for="item in paymentOverview"
                :key="item.value"
                class="space-y-2"
              >
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <span
                      class="h-2.5 w-2.5 rounded-full"
                      :class="item.dotClass"
                    ></span>
                    <span class="text-sm font-medium text-neutral-700">
                      {{ item.label }}
                    </span>
                  </div>
                  <span class="text-sm font-semibold text-neutral-950">
                    {{ item.count }}
                  </span>
                </div>

                <div class="h-2 rounded-full bg-neutral-100">
                  <div
                    class="h-full rounded-full transition-all duration-300"
                    :class="item.barClass"
                    :style="{ width: progressWidth(item.count) }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <BaseCard variant="elevated" padding="lg" class="space-y-5">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <div class="space-y-2">
            <BaseBadge variant="outline" size="md">
              {{ t("admin.dashboard.queue.eyebrow") }}
            </BaseBadge>
            <div class="space-y-1">
              <h2 class="text-2xl font-semibold tracking-tight text-neutral-950">
                {{ t("admin.dashboard.queue.title") }}
              </h2>
              <p class="text-sm leading-6 text-neutral-600">
                {{ t("admin.dashboard.queue.desc") }}
              </p>
            </div>
          </div>

          <BaseBadge variant="outline" size="md">
            {{ t("admin.dashboard.queue.badge", { count: attentionCount }) }}
          </BaseBadge>
        </div>

        <BaseEmptyState
          v-if="attentionOrders.length === 0"
          :title="t('admin.dashboard.queue.emptyTitle')"
          :description="t('admin.dashboard.queue.emptyDesc')"
          padding="lg"
        />

        <div v-else class="space-y-3">
          <div
            v-for="order in attentionOrders"
            :key="`attention-${order.id}`"
            class="rounded-4xl border border-neutral-200 bg-neutral-50/70 p-4"
          >
            <div
              class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
            >
              <div class="space-y-1">
                <p class="text-sm font-semibold text-neutral-950">
                  {{ t("admin.dashboard.order.orderNumber") }} #{{ order.id }}
                </p>
                <p class="text-sm text-neutral-600">
                  {{ order.customer_name || t("admin.dashboard.fallback.na") }}
                </p>
              </div>

              <p
                class="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400"
              >
                {{ formatDate(order.created_at) }}
              </p>
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <BaseBadge :variant="statusVariant(order.status)" size="sm">
                {{ statusLabel(order.status) }}
              </BaseBadge>
              <BaseBadge
                :variant="paymentVariant(order.payment_status)"
                size="sm"
              >
                {{ paymentLabel(order.payment_status) }}
              </BaseBadge>
            </div>

            <p class="mt-3 text-sm leading-6 text-neutral-500">
              {{
                [
                  order.phone || t("admin.dashboard.fallback.na"),
                  order.city || t("admin.dashboard.fallback.na"),
                ].join(" • ")
              }}
            </p>
          </div>
        </div>
      </BaseCard>
    </section>

    <BaseCard variant="elevated" padding="lg" class="space-y-6">
      <div
        class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div class="space-y-2">
          <BaseBadge variant="outline" size="md">
            {{ t("admin.dashboard.filters.eyebrow") }}
          </BaseBadge>
          <div class="space-y-1">
            <h2 class="text-2xl font-semibold tracking-tight text-neutral-950">
              {{ t("admin.dashboard.filters.title") }}
            </h2>
            <p class="text-sm leading-6 text-neutral-600">
              {{ t("admin.dashboard.filters.desc") }}
            </p>
          </div>
        </div>

        <div
          class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-600"
        >
          <span>{{ t("admin.dashboard.filters.currentView") }}</span>
          <span class="font-semibold text-neutral-950">
            {{ currentViewLabel }}
          </span>
        </div>
      </div>

      <div class="grid gap-4 xl:grid-cols-[minmax(0,1.2fr),15rem,1fr]">
        <BaseInput
          v-model="searchQuery"
          :label="t('admin.dashboard.filters.searchLabel')"
          :placeholder="t('admin.dashboard.filters.searchPlaceholder')"
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
            {{ t("admin.dashboard.filters.timeLabel") }}
          </span>
          <select v-model="selectedDateFilter" class="ui-input-base min-h-11 px-4 text-sm">
            <option
              v-for="option in dateFilterOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </label>

        <div class="space-y-2">
          <span class="ui-field-label">
            {{ t("admin.dashboard.filters.statusLabel") }}
          </span>
          <div class="flex flex-wrap gap-2">
            <BaseButton
              v-for="status in statusFilters"
              :key="status.value"
              size="sm"
              :variant="selectedStatus === status.value ? 'primary' : 'outline'"
              @click="selectedStatus = status.value"
            >
              {{ status.label }}
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="elevated" padding="none" class="overflow-hidden">
      <div
        class="flex flex-col gap-3 border-b border-neutral-200 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6"
      >
        <div class="space-y-1">
          <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
            {{ t("admin.dashboard.table.title") }}
          </h2>
          <p class="text-sm text-neutral-500">
            {{
              t("admin.dashboard.table.subtitle", {
                count: filteredOrders.length,
              })
            }}
          </p>
        </div>

        <BaseBadge variant="outline" size="md">
          {{ t("admin.dashboard.table.sorted") }}
        </BaseBadge>
      </div>

      <div v-if="isLoading" class="space-y-4 p-5 md:p-6">
        <div
          v-for="index in 5"
          :key="index"
          class="grid gap-4 rounded-4xl border border-neutral-200 bg-neutral-50/70 p-5 xl:grid-cols-[1.2fr,0.9fr,0.8fr,0.9fr,0.9fr]"
        >
          <BaseSkeleton height="1.125rem" />
          <BaseSkeleton height="1.125rem" />
          <BaseSkeleton height="1.125rem" />
          <BaseSkeleton height="1.125rem" />
          <BaseSkeleton height="2.75rem" rounded="xl" />
        </div>
      </div>

      <BaseEmptyState
        v-else-if="filteredOrders.length === 0"
        :title="t('admin.dashboard.empty.title')"
        :description="t('admin.dashboard.empty.desc')"
        padding="xl"
      />

      <div v-else>
        <div class="hidden xl:block">
          <div class="grid grid-cols-[1.2fr,0.9fr,0.8fr,0.9fr,0.9fr] gap-4 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span>{{ t("admin.dashboard.table.columns.order") }}</span>
            <span>{{ t("admin.dashboard.table.columns.customer") }}</span>
            <span>{{ t("admin.dashboard.table.columns.total") }}</span>
            <span>{{ t("admin.dashboard.table.columns.payment") }}</span>
            <span>{{ t("admin.dashboard.table.columns.actions") }}</span>
          </div>

          <div class="divide-y divide-neutral-200">
            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="grid grid-cols-[1.2fr,0.9fr,0.8fr,0.9fr,0.9fr] gap-4 px-6 py-5 transition hover:bg-neutral-50/70"
            >
              <div class="space-y-3">
                <div class="flex flex-wrap items-center gap-2">
                  <p class="text-sm font-semibold text-neutral-950">
                    {{ t("admin.dashboard.order.orderNumber") }} #{{ order.id }}
                  </p>
                  <BaseBadge :variant="statusVariant(order.status)" size="sm">
                    {{ statusLabel(order.status) }}
                  </BaseBadge>
                </div>

                <div class="space-y-1 text-sm text-neutral-500">
                  <p>{{ formatDate(order.created_at) }}</p>
                  <p>
                    {{ order.items?.map((item) => item.title || item.name).join(" • ") || t("admin.dashboard.fallback.noProducts") }}
                  </p>
                </div>
              </div>

              <div class="space-y-2 text-sm text-neutral-600">
                <p class="font-semibold text-neutral-950">
                  {{ order.customer_name || t("admin.dashboard.fallback.na") }}
                </p>
                <p>{{ order.phone || t("admin.dashboard.fallback.na") }}</p>
                <p>{{ order.city || t("admin.dashboard.fallback.na") }}</p>
              </div>

              <div class="space-y-2">
                <p class="text-lg font-semibold text-neutral-950">
                  {{ order.total }} {{ t("productCard.currency") }}
                </p>
                <p class="text-sm text-neutral-500">
                  {{
                    t("admin.dashboard.table.itemsCount", {
                      count: getItemsCount(order.items),
                    })
                  }}
                </p>
              </div>

              <div class="space-y-3">
                <BaseBadge :variant="paymentVariant(order.payment_status)" size="sm">
                  {{ paymentLabel(order.payment_status) }}
                </BaseBadge>
                <p class="text-sm text-neutral-500">
                  {{ order.payment_method || t("admin.dashboard.fallback.na") }}
                </p>
              </div>

              <div class="space-y-3">
                <StatusDropdown
                  :model-value="order.status"
                  :options="orderStatusOptions"
                  @change="ordersStore.updateOrderStatus(order.id, $event)"
                />
                <StatusDropdown
                  :model-value="order.payment_status"
                  :options="paymentStatusOptions"
                  @change="ordersStore.updateOrderPaymentStatus(order.id, $event)"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-4 p-5 md:p-6 xl:hidden">
          <BaseCard
            v-for="order in filteredOrders"
            :key="order.id"
            variant="muted"
            padding="lg"
            class="space-y-5"
          >
            <div
              class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
            >
              <div class="space-y-2">
                <div class="flex flex-wrap items-center gap-2">
                  <p class="text-base font-semibold tracking-tight text-neutral-950">
                    {{ t("admin.dashboard.order.orderNumber") }} #{{ order.id }}
                  </p>
                  <BaseBadge :variant="statusVariant(order.status)" size="sm">
                    {{ statusLabel(order.status) }}
                  </BaseBadge>
                </div>
                <p class="text-sm text-neutral-500">
                  {{ formatDate(order.created_at) }}
                </p>
              </div>

              <p class="text-lg font-semibold text-neutral-950">
                {{ order.total }} {{ t("productCard.currency") }}
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2 text-sm text-neutral-600">
                <p>
                  <span class="font-semibold text-neutral-950">
                    {{ t("admin.dashboard.order.customer") }}:
                  </span>
                  {{ order.customer_name || t("admin.dashboard.fallback.na") }}
                </p>
                <p>
                  <span class="font-semibold text-neutral-950">
                    {{ t("admin.dashboard.order.phone") }}:
                  </span>
                  {{ order.phone || t("admin.dashboard.fallback.na") }}
                </p>
                <p>
                  <span class="font-semibold text-neutral-950">
                    {{ t("admin.dashboard.order.city") }}:
                  </span>
                  {{ order.city || t("admin.dashboard.fallback.na") }}
                </p>
              </div>

              <div class="space-y-2 text-sm text-neutral-600">
                <p>
                  <span class="font-semibold text-neutral-950">
                    {{ t("admin.dashboard.order.paymentMethod") }}:
                  </span>
                  {{ order.payment_method || t("admin.dashboard.fallback.na") }}
                </p>
                <p>
                  <span class="font-semibold text-neutral-950">
                    {{ t("admin.dashboard.order.itemsCount") }}:
                  </span>
                  {{ getItemsCount(order.items) }}
                </p>
                <p>
                  <span class="font-semibold text-neutral-950">
                    {{ t("admin.dashboard.order.notes") }}:
                  </span>
                  {{ order.notes || t("admin.dashboard.fallback.noNotes") }}
                </p>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <StatusDropdown
                :model-value="order.status"
                :options="orderStatusOptions"
                @change="ordersStore.updateOrderStatus(order.id, $event)"
              />
              <StatusDropdown
                :model-value="order.payment_status"
                :options="paymentStatusOptions"
                @change="ordersStore.updateOrderPaymentStatus(order.id, $event)"
              />
            </div>
          </BaseCard>
        </div>
      </div>
    </BaseCard>
  </AdminShell>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "admin"],
});

import { computed, onMounted, ref } from "vue";
import AdminMetricCard from "~/components/admin/AdminMetricCard.vue";
import AdminShell from "~/components/admin/AdminShell.vue";
import StatusDropdown from "~/components/StatusDropdown.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseEmptyState from "~/components/ui/BaseEmptyState.vue";
import BaseInput from "~/components/ui/BaseInput.vue";
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";
import { useOrdersStore } from "~/stores/orders";

const localePath = useLocalePath();
const { t, locale } = useI18n();
const ordersStore = useOrdersStore();

const isLoading = ref(true);
const selectedStatus = ref("all");
const selectedDateFilter = ref("all");
const searchQuery = ref("");

const orderStatusOptions = computed(() => [
  { label: t("admin.dashboard.status.pending"), value: "pending" },
  { label: t("admin.dashboard.status.confirmed"), value: "confirmed" },
  { label: t("admin.dashboard.status.shipped"), value: "shipped" },
  { label: t("admin.dashboard.status.delivered"), value: "delivered" },
  { label: t("admin.dashboard.status.cancelled"), value: "cancelled" },
]);

const paymentStatusOptions = computed(() => [
  { label: t("admin.dashboard.payment.paid"), value: "paid" },
  { label: t("admin.dashboard.payment.unpaid"), value: "unpaid" },
  { label: t("admin.dashboard.payment.pending"), value: "pending" },
  { label: t("admin.dashboard.payment.failed"), value: "failed" },
  { label: t("admin.dashboard.payment.refunded"), value: "refunded" },
]);

const dateFilterOptions = computed(() => [
  { label: t("admin.dashboard.filters.allTime"), value: "all" },
  { label: t("admin.dashboard.filters.today"), value: "today" },
  { label: t("admin.dashboard.filters.last7Days"), value: "7days" },
  { label: t("admin.dashboard.filters.last30Days"), value: "30days" },
  { label: t("admin.dashboard.filters.thisMonth"), value: "thisMonth" },
]);

const statusFilters = computed(() => [
  { label: t("admin.dashboard.filters.statusAll"), value: "all" },
  { label: t("admin.dashboard.status.pending"), value: "pending" },
  { label: t("admin.dashboard.status.confirmed"), value: "confirmed" },
  { label: t("admin.dashboard.status.shipped"), value: "shipped" },
  { label: t("admin.dashboard.status.delivered"), value: "delivered" },
  { label: t("admin.dashboard.status.cancelled"), value: "cancelled" },
]);

onMounted(async () => {
  isLoading.value = true;
  await ordersStore.fetchOrders();
  isLoading.value = false;
});

const allOrders = computed(() => ordersStore.getAllOrders() || []);

const filteredOrders = computed(() => {
  let orders = [...allOrders.value];
  const now = new Date();

  if (selectedStatus.value !== "all") {
    orders = orders.filter((order) => order.status === selectedStatus.value);
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();

    orders = orders.filter((order) =>
      [order.id, order.customer_name, order.phone]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }

  if (selectedDateFilter.value !== "all") {
    orders = orders.filter((order) => {
      if (!order.created_at) return false;

      const orderDate = new Date(order.created_at);

      switch (selectedDateFilter.value) {
        case "today":
          return orderDate.toDateString() === now.toDateString();
        case "7days": {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          return orderDate >= sevenDaysAgo;
        }
        case "30days": {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          return orderDate >= thirtyDaysAgo;
        }
        case "thisMonth":
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        default:
          return true;
      }
    });
  }

  return orders.sort(
    (firstOrder, secondOrder) =>
      new Date(secondOrder.created_at).getTime() -
      new Date(firstOrder.created_at).getTime(),
  );
});

const totalOrders = computed(() => filteredOrders.value.length);

const totalRevenue = computed(() =>
  filteredOrders.value.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  ),
);

const averageOrderValue = computed(() =>
  totalOrders.value ? Math.round(totalRevenue.value / totalOrders.value) : 0,
);

const uniqueCustomers = computed(() => {
  const identifiers = filteredOrders.value
    .map(
      (order) =>
        order.userId ||
        order.phone ||
        order.customer_name ||
        order.id,
    )
    .filter(Boolean);

  return new Set(identifiers).size;
});

const productUnits = computed(() =>
  filteredOrders.value.reduce(
    (sum, order) => sum + getItemsCount(order.items),
    0,
  ),
);

const countOrdersByStatus = (status) =>
  filteredOrders.value.filter((order) => order.status === status).length;

const countOrdersByPaymentStatus = (status) =>
  filteredOrders.value.filter((order) => order.payment_status === status).length;

const deliveredRate = computed(() => {
  if (!totalOrders.value) return 0;

  return Math.round((countOrdersByStatus("delivered") / totalOrders.value) * 100);
});

const statusOverview = computed(() => [
  {
    value: "pending",
    label: statusLabel("pending"),
    count: countOrdersByStatus("pending"),
    dotClass: "bg-warning-500",
    barClass: "bg-warning-500",
  },
  {
    value: "confirmed",
    label: statusLabel("confirmed"),
    count: countOrdersByStatus("confirmed"),
    dotClass: "bg-brand-500",
    barClass: "bg-brand-500",
  },
  {
    value: "shipped",
    label: statusLabel("shipped"),
    count: countOrdersByStatus("shipped"),
    dotClass: "bg-accent-500",
    barClass: "bg-accent-500",
  },
  {
    value: "delivered",
    label: statusLabel("delivered"),
    count: countOrdersByStatus("delivered"),
    dotClass: "bg-success-500",
    barClass: "bg-success-500",
  },
]);

const paymentOverview = computed(() => [
  {
    value: "paid",
    label: paymentLabel("paid"),
    count: countOrdersByPaymentStatus("paid"),
    dotClass: "bg-success-500",
    barClass: "bg-success-500",
  },
  {
    value: "unpaid",
    label: paymentLabel("unpaid"),
    count: countOrdersByPaymentStatus("unpaid"),
    dotClass: "bg-danger-500",
    barClass: "bg-danger-500",
  },
  {
    value: "pending",
    label: paymentLabel("pending"),
    count: countOrdersByPaymentStatus("pending"),
    dotClass: "bg-warning-500",
    barClass: "bg-warning-500",
  },
  {
    value: "refunded",
    label: paymentLabel("refunded"),
    count: countOrdersByPaymentStatus("refunded"),
    dotClass: "bg-accent-500",
    barClass: "bg-accent-500",
  },
]);

const attentionPriority = (order) => {
  let score = 0;

  if (order.status === "pending") {
    score += 2;
  }

  if (order.payment_status === "unpaid") {
    score += 2;
  }

  if (order.payment_status === "pending") {
    score += 1;
  }

  return score;
};

const orderTimestamp = (order) => {
  const timestamp = new Date(order.created_at || 0).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const attentionPool = computed(() =>
  [...filteredOrders.value]
    .filter(
      (order) =>
        attentionPriority(order) > 0 ||
        ["pending", "confirmed"].includes(order.status),
    )
    .sort((firstOrder, secondOrder) => {
      const scoreDifference =
        attentionPriority(secondOrder) - attentionPriority(firstOrder);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return orderTimestamp(firstOrder) - orderTimestamp(secondOrder);
    }),
);

const attentionCount = computed(() => attentionPool.value.length);

const attentionOrders = computed(() => attentionPool.value.slice(0, 4));

const currentViewLabel = computed(() => {
  if (selectedStatus.value === "all") {
    return t("admin.dashboard.filters.statusAll");
  }

  return statusLabel(selectedStatus.value);
});

const getItemsCount = (items) => {
  if (!items?.length) return 0;

  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
};

const formatDate = (date) => {
  if (!date) return t("admin.dashboard.fallback.na");

  return new Intl.DateTimeFormat(locale.value === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const statusLabel = (status) =>
  t(`admin.dashboard.status.${status || "pending"}`);

const paymentLabel = (status) =>
  t(`admin.dashboard.payment.${status || "pending"}`);

const statusVariant = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "primary";
    case "shipped":
      return "accent";
    case "delivered":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "neutral";
  }
};

const paymentVariant = (status) => {
  switch (status) {
    case "paid":
      return "success";
    case "unpaid":
      return "danger";
    case "pending":
      return "warning";
    case "failed":
      return "danger";
    case "refunded":
      return "accent";
    default:
      return "neutral";
  }
};

const progressWidth = (count) => {
  if (!totalOrders.value) {
    return "0%";
  }

  const width = (count / totalOrders.value) * 100;
  return `${Math.max(width, count ? 8 : 0)}%`;
};
</script>
