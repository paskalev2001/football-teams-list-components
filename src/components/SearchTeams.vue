<template>
  <div id="search-teams">
    <div class="head-options">
      <input
        type="search"
        placeholder="Search Team"
        v-model="filter"
      />
      <div class="teams-wrapper">
        <div class="team" v-for="r of rows" :key="r.id">
          <span class="leagues">{{ r.leagues.join(', ') }}</span>
          <span class="name">{{ r.name }} - {{ r.stadium }}</span>
          <button :class="getBtnClass(r.is_following)" @click="setSubscription(r.id)">{{checkSubscription(r.id)}}</button>
        </div>
        <span class="not-found" v-if="rows?.length === 0">No teams found!</span>
      </div>
    </div>
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
  data() {
    return {
      filter: ''
    }
  },
  computed: {
    rows() {
      if(!this.data) {
        return
      }
      const rows: never[] = [];
      const regex = new RegExp(this.filter, 'i')

      for (const team of <[]>[...this.data]) {
        const name = team[1]['name'] ?? ''
        const stadium = team[1]['stadium'] ?? ''
        const leagues = team[1]['leagues'] ?? ['']

        if (!this.matchAny([name, stadium, ...leagues], regex)) {
          continue;
        }
        
        rows.push(team[1])
      }
      return rows
    }
  },
  methods: {
    matchAny(items: string[], regex: RegExp) {
      if (items == null || !Array.isArray(items) || !(regex instanceof RegExp)) {
        return false
      }
      return items.some(item => item != null && regex.test(item))
    },
    checkSubscription(id:string) {
      if (!this.data) {
        return ''
      }
      return this.data.get(id).is_following ? 'Following' : 'Follow'
    },
    setSubscription(id: string) {
      this.store.setFollowing(id)
    },
    getBtnClass(isFollowing: Boolean) {
      if (isFollowing === true) {
        return 'following'
      } else {
        return 'follow'
      }
    },
  }
}

</script>

<style lang="scss" scoped>
#search-teams {
  width: 375px;
  .head-options {
    text-align: left;
    margin: 4px;
  }

  .teams-wrapper {
    overflow: scroll;
    max-height: 400px;
    margin-top: 8px;
    border: 2px solid #1C6EA4;
    border-radius: 8px;
    .team {
      display: grid;
      grid-template-columns: auto auto 150px;
      grid-template-rows: auto;
      grid-template-areas: 
        "leagues leagues follow"
        "name stadium follow"
      ;
      margin: 12px 4px;
      .leagues {
        grid-area: leagues;
        color:gray;
        font-size: 12px;
      }

      .name {
        grid-area: name;
        font-weight: 600;
        color: rgb(0, 0, 0);
      }

      button.follow {
        height: 32px;
        grid-area: follow;
        box-shadow: 0px 0px 0px 2px #9fb4f2;
        background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
        background-color:#7892c2;
        border-radius:4px;
        border:1px solid #4e6096;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-size:12px;
        padding:6px 8px;
        text-decoration:none;
        text-shadow:0px 1px 0px #283966;
      }

      button.follow:hover {
        background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
	      background-color:#476e9e;
      }

      button.following {
        height: 32px;
        grid-area: follow;
        box-shadow: 0px 0px 0px 2px #9fb4f2;
        background:linear-gradient(to bottom, #ffffff 5%, #ffffff 100%);
        background-color:#e6e8ec;
        border-radius:4px;
        border:1px solid #4e6096;
        display:inline-block;
        cursor:pointer;
        color:#434343;
        font-size:12px;
        padding:6px 8px;
        text-decoration:none;
        text-shadow:0px 1px 0px #283966;
      }
    }
  }
}
</style>