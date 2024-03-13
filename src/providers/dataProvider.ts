import { DataProvider } from '@refinedev/core';
import simpleDataProvider from '@refinedev/simple-rest';
import { API_URL } from '../contexts/constant';

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
  // getList: async ({ resource, pagination }) => {
  //   const url = `${apiUrl}/${resource}`;

  //   const { current = 1, pageSize = 10 } = pagination ?? {};

  //   const query: {
  //     _start?: number;
  //     _end?: number;
  //   } = {
  //     _start: (current - 1) * pageSize,
  //     _end: current * pageSize,
  //   };

  //   const response = await fetch(
  //     `${API_URL}/${resource}?` + new URLSearchParams({ ...query }).toString()
  //   );

  //   const total = +headers["x-total-count"];

  //   return {
  //     data,
  //     total,
  //   };
  // },
};
