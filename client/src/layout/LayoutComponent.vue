<script setup lang="ts">
import NavBar from "./NavBar.vue";
import FooterBar from "./FooterBar.vue";
</script>
<template>
  <NavBar/>
  <main>
    <slot/>
  </main>
  <FooterBar/>
</template>
