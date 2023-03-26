import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'example',
  state: () => ({
    data: null
  }),
  getters: {
    getData: state => state.data
  },
  actions: {
    async fetchData() {
      try {
        const response = await fetch('https://run.mocky.io/v3/ef80523b-0474-4104-8fe6-fe92f8360b28');
        const data = await response.json();
        console.log('store::', data)
        this.setData(new Map(data.map((dt: { id: string; }) => {
          return [dt.id, dt]
        })));
      } catch (error) {
        console.log(error);
      }
    },
    setData(data: any) {
      this.data = data;
    },
    setFollowing(id: string) {
      const team = this.data.get(id)
      team.is_following = !team.is_following
    }
  },
});