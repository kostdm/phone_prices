import { createStore } from 'vuex';
import { getPhones } from '../api/phones';

type PhoneCategory = 'regular' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'exclusive';

type Phone = {
  phone: string;
  category: PhoneCategory;
  price: number;
};

interface StoreData {
  page: number;
  search: string;
  selectedCategory: PhoneCategory | 'all';
  isAuth: boolean;
  isError: boolean;
  isLoading: boolean;
  errorMessage: string;
  token: string;
  phones: Phone[];
}

interface ChangePayload {
  phone: string;
  category?: PhoneCategory;
  price?: number;
}

interface LoginSuccessPayload {
  token: string;
  phones: Phone[];
}

interface LoginErrorPayload {
  message: string;
}

interface LoginPayload {
  token: string;
}

export default createStore<StoreData>({
  state: {
    page: 1,
    search: '',
    selectedCategory: 'all',
    isAuth: false,
    isError: false,
    isLoading: false,
    errorMessage: '',
    token: '',
    phones: [],
  },
  getters: {
    filteredPhones(state) {
      const items = 100;
      const filtered = state.phones.filter(i => state.selectedCategory === 'all' ? true : i.category === state.selectedCategory);
      const sorted = [
        ...filtered.filter(i => i.category === 'exclusive'),
        ...filtered.filter(i => i.category === 'platinum'),
        ...filtered.filter(i => i.category === 'gold'),
        ...filtered.filter(i => i.category === 'silver'),
        ...filtered.filter(i => i.category === 'bronze'),
        ...filtered.filter(i => i.category === 'regular'),
      ];
      return sorted.filter(i => i.phone.indexOf(state.search) !== -1);
    },
    filteredPage(state, getters) {
      const items = 100;
      const from = (state.page - 1) * items;
      const to = (state.page) * items;
      return (getters.filteredPhones as Phone[]).filter(i => i.phone.indexOf(state.search) !== -1).slice(from, to);
    },
  },
  mutations: {
    changePage(state, value: number) {
      state.page = value;
    },
    changeFilter(state, value: { search: string; category: PhoneCategory | 'all' }) {   
      state.page = 1;
      state.search = value.search;
      state.selectedCategory = value.category;
    },
    changePhone(state, payload: ChangePayload) {
      const index = state.phones.findIndex(i => i.phone === payload.phone);
      if (index !== -1) {
        const { category, price } = payload;
        if (category) {
          state.phones[index].category = category;
        }
        if (price || price === 0) {
          state.phones[index].price = price;
        }
      }
    },
    loading (state) {
      state.isLoading = true;
    },
    loginSuccess(state, payload: LoginSuccessPayload) {
      state.isLoading = false;
      state.isAuth = true;
      state.token = payload.token;
      state.phones = payload.phones;
      state.isError = false;
      state.errorMessage = '';
    },
    loginError(state, payload: LoginErrorPayload) {
      state.isLoading = false;
      state.isAuth = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
  actions: {
    increasePage(store) {
      store.commit('changePage', store.state.page + 1);
    },
    decreasePage(store) {
      if (store.state.page > 1) {
        store.commit('changePage', store.state.page - 1);
      }
    },
    changeFilter(store, value: {search: string; category: PhoneCategory | 'all'}) {
      store.commit('changeFilter', {...value});
    },
    changePhone(store, data: ChangePayload) {
      store.commit('changePhone', data);
    },
    async login (store, data: LoginPayload) {
      try {
        store.commit('loading');
        const result = await getPhones(data.token);
        if (result.status !== 200 && result?.data?.result === 'error') throw Error(result.data.message);
        if (result.status !== 200) throw Error('Unknown error');

        store.commit('loginSuccess', {
          token: data.token,
          phones: result?.data?.data,
        });
      }
      catch (err) {
        if (err instanceof Error) {
          store.commit('loginError', { message: err.message });
        }
      }
    }
  },
});