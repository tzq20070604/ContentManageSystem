import { unMounted } from 'vue';
<template>
  <div>
    <p>Current component: A</p>
    <span>count: {{ count }}</span>
    <button @click="count++">+</button>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const count = ref([])
onMounted(() => {
  count.value = route.query.aa ?? 0
})

</script>
