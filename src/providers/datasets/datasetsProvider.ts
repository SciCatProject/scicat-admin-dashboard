import { BaseRecord, CustomResponse, DataProvider } from '@refinedev/core';
import simpleDataProvider from '@refinedev/simple-rest';
import { API_URL, TOKEN_KEY } from '../../contexts/constant';
import { encode } from 'punycode';
import { buildURL, fetchResource } from '../fetchHelpers';
import { DatasetWithCreationTime, IDataset } from './datasetsInterface';

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
      console.error(`Error in ${resource} getOne:`, error);
      throw error;
    }
  },
  getList: async ({ resource, pagination, sorters, filters, meta }: any) => {
    const facets = ['type', 'creationLocation', 'ownerGroup', 'keywords'];
    const { current = 1, pageSize = 25 } = pagination;
    const limits = {
      skip: current * pageSize,
      limit: pageSize,
      order: 'creationTime:asc',
    };

    const queryParams = {
      fields: JSON.stringify({}),
      limits: JSON.stringify(limits),
    };
    const facetParams = {
      fields: JSON.stringify({ mode: {} }),
      facets: JSON.stringify(facets),
    };

    const fullQueryURL = buildURL({
      resource,
      endpoint: 'fullquery',
      params: queryParams,
    });
    const fullFacetURL = buildURL({
      resource,
      endpoint: 'fullfacet',
      params: facetParams,
    });

    try {
      const [data, count] = await Promise.all([
        fetchResource(fullQueryURL, meta.method),
        fetchResource(fullFacetURL, meta.method),
      ]);

      return {
        data,
        total: count[0].all[0].totalSets,
      };
    } catch (error) {
      console.error(`Error in ${resource} getList`, error);
      throw error;
    }
  },

  custom: async ({ pagination, sorters, filters, meta, config, url }: any) => {
    const { fields = [], limits = { limit: 100, skip: 0, order: {} } } = filters[0].value;

    const limitParams = {
      limit: +limits.limit,
      skip: +limits.skip,
      order: limits.order,
    };

    const params = {
      filter: JSON.stringify({
        fields: fields,
        limits: limitParams,
      }),
    };
    const findAllURL = buildURL({
      resource: url,
      params: params,
    });
    try {
      const data = await fetchResource(findAllURL);

      return { data };
    } catch (error) {
      console.error(`Error in ${url} getList`, error);
      throw error;
    }
  },
};
