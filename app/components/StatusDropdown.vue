<template>
  <div class="relative" ref="dropdownRef">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex min-h-11 w-full items-center justify-between rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 shadow-soft transition duration-200 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      <span>{{ selectedLabel }}</span>

      <svg
        class="h-4 w-4 text-neutral-400 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-floating"
      >
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          @click="selectOption(option.value)"
          class="w-full px-4 py-3 text-start text-sm transition duration-200"
          :class="
            modelValue === option.value
              ? 'bg-brand-50 font-medium text-brand-900'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
          "
        >
          {{ option.label }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const selectedLabel = computed(() => {
  return (
    props.options.find((option) => option.value === props.modelValue)?.label ||
    props.placeholder
  );
});

const selectOption = (value) => {
  emit("update:modelValue", value);
  emit("change", value);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.22s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
