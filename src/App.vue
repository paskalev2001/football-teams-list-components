<script setup lang="ts">
import MyTeams from './components/MyTeams.vue';
import SearchTeams from './components/SearchTeams.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <SearchTeams class="card"/>
      <MyTeams class="card"/>
    </div>
  </header>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
