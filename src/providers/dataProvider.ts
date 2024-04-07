import { DataProvider } from '@refinedev/core';
import simpleDataProvider from '@refinedev/simple-rest';
import { API_URL, TOKEN_KEY } from '../contexts/constant';
import { encode } from 'punycode';

const simpleRestProvider = simpleDataProvider(API_URL);
export const dataProvider: DataProvider = {
  ...simpleRestProvider,
  getOne: async ({ resource, id }) => {
    try {
      const response = await fetch(`${API_URL}/${resource}/${encodeURIComponent(id)}`);

      if (!response.ok) {
        throw new Error(`Error fetching resource: ${response.statusText}`);
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error in getOne:', error);
      throw error;
    }
  },
  getList: async ({ resource, pagination, sorters, filters, meta }: any) => {
    const findAll = `${API_URL}/datasets?${filters[0].value}`;

    const findAllRes = await fetch(findAll, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
    });

    if (findAllRes.status < 200 || findAllRes.status > 299) throw new Error('find All failed');

    const data = await findAllRes.json();

    return {
      data,
      total: data.length,
    };
  },
};
