import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

type PhoneData = {
  phone: string;
  category: string;
  price: number;
}

const phonesMock: PhoneData[] = [
  {
    phone: '73431234567',
    category: 'regular',
    price: 990,
  },
  {
    phone: '7343202020',
    category: 'regular',
    price: 990,
  },
  {
    phone: '73432002233',
    category: 'gold',
    price: 1990,
  }
];

const mock = new MockAdapter(axios);

mock.onGet('/phones').reply(200, {
  result: 'success',
  data: phonesMock,
});

mock.onPost('/phones').reply(204, {
  result: 'success',
  data: phonesMock,
});

const instance = axios.create({
  baseURL: 'https://localhost:3000/api/v1',
  timeout: 10000,
  validateStatus: () => true,
});

export const getPhones = (token: string) => instance.get('/phones', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

export const savePhones = (token: string, data: PhoneData[]) => instance.put('/phones', data, {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

