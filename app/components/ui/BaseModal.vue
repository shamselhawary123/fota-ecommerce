<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-brand-950/55 px-4 py-6 backdrop-blur-sm"
        @click="handleBackdrop"
      >
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-3 scale-[0.98] opacity-0"
          enter-to-class="translate-y-0 scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 scale-100 opacity-100"
          leave-to-class="translate-y-3 scale-[0.98] opacity-0"
        >
          <div
            v-if="modelValue"
            :class="modalClasses"
            role="dialog"
            aria-modal="true"
            :aria-label="title || t('common.modal')"
            @click.stop
          >
            <div class="flex items-start justify-between gap-4">
              <div class="space-y-2">
                <h2
                  v-if="title"
                  class="text-2xl font-semibold tracking-tight text-neutral-950"
                >
                  {{ title }}
                </h2>
                <p
                  v-if="description"
                  class="text-sm leading-6 text-neutral-600"
                >
                  {{ description }}
                </p>
              </div>

              <button
                v-if="closable"
                type="button"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900"
                @click="close"
              >
                <span class="sr-only">{{ t("common.close") }}</span>
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="mt-6">
              <slot />
            </div>

            <div
              v-if="$slots.footer"
              class="mt-6 flex flex-wrap items-center justify-end gap-3"
            >
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, watch } from "vue";

const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
  closable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
};

const modalClasses = computed(() => [
  "ui-panel w-full overflow-hidden rounded-4xl bg-white/96 p-6 shadow-floating backdrop-blur-xl md:p-8",
  sizeClasses[props.size] || sizeClasses.md,
]);

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleBackdrop = () => {
  if (props.closable) {
    close();
  }
};

const handleKeydown = (event) => {
  if (event.key === "Escape" && props.closable) {
    close();
  }
};

watch(
  () => props.modelValue,
  (isOpen) => {
    if (import.meta.client) {
      document.body.style.overflow = isOpen ? "hidden" : "";

      if (isOpen) {
        window.addEventListener("keydown", handleKeydown);
      } else {
        window.removeEventListener("keydown", handleKeydown);
      }
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKeydown);
  }
});
</script>
