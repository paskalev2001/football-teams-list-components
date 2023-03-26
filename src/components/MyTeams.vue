<template>
  <div id="my-teams">
    <h3>My Teams</h3>
    <ul>
      <li v-for="t of listItems">
        <span class="team">{{ t.name }}</span>
      </li>
    </ul>
    <span class="not-found" v-if="listItems.length === 0">
      You are not following any teams yet.
    </span>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/stores/index';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();

    // call the action to fetch the data
    store.fetchData();

    // access the data using the getter
    const data = computed(() => store.getData);

    return {
      data,
      store
    };
  },
  computed: {
    listItems() {
      if(!this.data || this.data.size === 0) {
        return []
      }
      const filteredResult = []

      for (const t of this.data) {
        if (t[1].is_following === true) {
          filteredResult.push(t[1])
        }
      }

      return filteredResult
    }
  }
}
</script>

<style lang="scss" scoped>

#my-teams {
  width: 375px;
  
  * {
    margin-left: 4px;
  }

  h3 {
    color: black;
  }
  span.team {
    color: black;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
}
</style>