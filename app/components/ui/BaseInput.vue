<template>
  <label v-if="label || hint || error" class="block">
    <span v-if="label" class="ui-field-label">
      {{ label }}
    </span>

    <div class="relative">
      <span
        v-if="$slots.leading"
        class="pointer-events-none absolute inset-y-0 start-4 inline-flex items-center text-neutral-400"
      >
        <slot name="leading" />
      </span>

      <component
        :is="tag"
        v-bind="$attrs"
        :id="id"
        :name="name"
        :rows="tag === 'textarea' ? rows : undefined"
        :type="tag === 'input' ? type : undefined"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="modelValue"
        :class="inputClasses"
        @input="handleInput"
      />

      <span
        v-if="$slots.trailing"
        class="absolute inset-y-0 end-4 inline-flex items-center text-neutral-400"
      >
        <slot name="trailing" />
      </span>
    </div>

    <span v-if="error" class="ui-field-error">
      {{ error }}
    </span>
    <span v-else-if="hint" class="ui-field-hint">
      {{ hint }}
    </span>
  </label>

  <div v-else class="relative">
    <span
      v-if="$slots.leading"
      class="pointer-events-none absolute inset-y-0 start-4 inline-flex items-center text-neutral-400"
    >
      <slot name="leading" />
    </span>

    <component
      :is="tag"
      v-bind="$attrs"
      :id="id"
      :name="name"
      :rows="tag === 'textarea' ? rows : undefined"
      :type="tag === 'input' ? type : undefined"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      :class="inputClasses"
      @input="handleInput"
    />

    <span
      v-if="$slots.trailing"
      class="absolute inset-y-0 end-4 inline-flex items-center text-neutral-400"
    >
      <slot name="trailing" />
    </span>
  </div>
</template>

<script setup>
import { computed, useSlots } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: "text",
  },
  tag: {
    type: String,
    default: "input",
  },
  size: {
    type: String,
    default: "md",
  },
  rows: {
    type: [String, Number],
    default: 4,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();

const sizeClasses = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
};

const inputClasses = computed(() => [
  "ui-input-base",
  sizeClasses[props.size] || sizeClasses.md,
  props.tag === "textarea" ? "py-3" : "",
  slots.leading ? "ps-11" : "",
  slots.trailing ? "pe-11" : "",
  props.error ? "border-danger-500/60 ring-danger-500/10" : "",
  props.disabled ? "cursor-not-allowed bg-neutral-100 text-neutral-500" : "",
]);

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
