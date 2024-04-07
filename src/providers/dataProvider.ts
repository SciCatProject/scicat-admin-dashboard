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
    console.log('-dataProvider');
    const facets = ['type', 'creationLocation', 'ownerGroup', 'keywords'];
    let limits: any = {
      skip: pagination?.current === 1 ? 0 : pagination?.current * pagination?.pageSize,
      limit: pagination?.pageSize,
      order: 'creationTime:asc',
    };

    const fullFacetParams = `fields=${encodeURIComponent(
      JSON.stringify({ mode: {} })
    )}&facets=${encodeURIComponent(JSON.stringify(facets))}`;

    const fullQueryURL = `${API_URL}/datasets?${filters[0].value}`;

    const fullQueryRes = await fetch(fullQueryURL, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
    });

    if (fullQueryRes.status < 200 || fullQueryRes.status > 299) throw fullQueryRes;

    const data = await fullQueryRes.json();

    return {
      data,
      total: data.length, // We'll cover this in the next steps.
    };
  },
};
