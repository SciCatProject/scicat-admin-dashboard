import { DataProvider } from '@refinedev/core';
import simpleDataProvider from '@refinedev/simple-rest';
import { API_URL, TOKEN_KEY } from '../../contexts/constant';
import { encode } from 'punycode';

const simpleRestProvider = simpleDataProvider(API_URL);
export const datasetsProvider: DataProvider = {
  ...simpleRestProvider,
  getOne: async ({ resource, id }) => {
    try {
      const response = await fetch(`${API_URL}/datasets/${encodeURIComponent(id)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
      });

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
    const facets = ['type', 'creationLocation', 'ownerGroup', 'keywords'];
    let limits: any = {
      skip: pagination?.current === 1 ? 0 : pagination?.current * pagination?.pageSize,
      limit: pagination?.pageSize,
      order: 'creationTime:asc',
    };

    const fullFacetParams = `fields=${encodeURIComponent(
      JSON.stringify({ mode: {} })
    )}&facets=${encodeURIComponent(JSON.stringify(facets))}`;

    const fullQueryURL = `${API_URL}/datasets/fullquery?${filters[0].value}`;

    const fullFacetURL = `${API_URL}/datasets/fullfacet?${fullFacetParams}`;

    const fullQueryRes = await fetch(fullQueryURL, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
    });
    const fullFacetRes = await fetch(fullFacetURL, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
    });

    if (fullQueryRes.status < 200 || fullQueryRes.status > 299) throw fullQueryRes;

    const data = await fullQueryRes.json();
    const count = await fullFacetRes.json();

    return {
      data,
      total: count[0].all[0].totalSets, // We'll cover this in the next steps.
    };
  },
};
