<template>
  <div class="relative" ref="dropdownRef">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-2xl text-sm font-medium shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-between"
    >
      <span>{{ selectedLabel }}</span>

      <svg
        class="w-4 h-4 text-gray-500 transition-transform duration-300"
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
        class="absolute z-50 mt-2 w-full rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
      >
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          @click="selectOption(option.value)"
          class="w-full text-left px-4 py-3 text-sm transition-colors duration-200"
          :class="
            modelValue === option.value
              ? 'bg-gray-100 text-black font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-black'
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
});

const emit = defineEmits(["update:modelValue", "change"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const selectedLabel = computed(() => {
  return (
    props.options.find((option) => option.value === props.modelValue)?.label ||
    "Select"
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
