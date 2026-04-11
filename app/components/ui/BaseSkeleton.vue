<template>
  <div
    v-if="lines <= 1"
    class="ui-skeleton"
    :class="shapeClasses"
    :style="singleStyle"
  ></div>

  <div v-else class="space-y-3">
    <div
      v-for="line in lines"
      :key="line"
      class="ui-skeleton"
      :class="shapeClasses"
      :style="lineStyle(line)"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "1rem",
  },
  rounded: {
    type: String,
    default: "xl",
  },
  lines: {
    type: Number,
    default: 1,
  },
  circle: {
    type: Boolean,
    default: false,
  },
});

const roundedClasses = {
  none: "",
  md: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

const shapeClasses = computed(() => {
  if (props.circle) return "rounded-full";
  return roundedClasses[props.rounded] || roundedClasses.xl;
});

const singleStyle = computed(() => ({
  width: props.width,
  height: props.height,
}));

const lineStyle = (line) => ({
  width: line === props.lines ? "82%" : "100%",
  height: props.height,
});
</script>
