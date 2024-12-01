<template>
  <div
    v-if="iconPath"
    :style="{ width: size, height: size }"
    class="inline-flex justify-center items-center"
    v-html="iconContent"
  ></div>
  <div v-else>
    <p class="text-red-500">Icon "{{ name }}" not found in mapping.</p>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { icons } from "~/utils/icons.util";

  // Props
  const props = defineProps<{
    name: string;
    size?: string;
  }>();

  const size = computed(() => props.size || "24px");
  const iconPath = computed(() => {
    console.log("Icon name received:", props.name); // Depuración
    return icons[props.name as keyof typeof icons] || null;
  });

  const iconContent = ref<string | null>(null);

  // Carga dinámica del SVG
  watch(iconPath, async (newPath) => {
    if (newPath) {
      try {
        console.log("Loading SVG from:", newPath); // Depuración
        const response = await fetch(newPath);
        if (!response.ok) throw new Error(`Failed to load SVG: ${props.name}`);
        iconContent.value = await response.text();
      } catch (error) {
        console.error(error);
        iconContent.value = null;
      }
    } else {
      console.warn("Icon path is null for:", props.name);
      iconContent.value = null;
    }
  });
</script>

<style scoped>
  .inline-flex svg {
    fill: currentColor;
    width: 100%;
    height: 100%;
  }
</style>
