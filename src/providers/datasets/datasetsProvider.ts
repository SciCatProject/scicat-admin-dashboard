import { DataProvider, Pagination } from '@refinedev/core';
import simpleDataProvider from '@refinedev/simple-rest';
import { envConfig } from '../../../configuration';
import { buildUriWithId, buildUriWithParam, fetchResource } from '../fetchHelpers';

const simpleRestProvider = simpleDataProvider(envConfig.API_URL);
export const datasetsProvider: DataProvider = {
  ...simpleRestProvider,
  getOne: async ({ resource, id }) => {
    try {
      const findOneURL = buildUriWithId({
        resource,
        id,
      });

      const data = await fetchResource(findOneURL);
      return { data };
    } catch (error) {
      console.error(`Error in ${resource} getOne:`, error);
      throw error;
    }
  },
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const facets = ['type', 'creationLocation', 'ownerGroup', 'keywords'];
    const { current = 0, pageSize = 25 } = pagination as Pagination;
    const limits = {
      skip: current <= 1 ? 0 : (current - 1) * pageSize,
      limit: pageSize,
      order: 'creationTime:desc',
    };

    const queryParams = {
      fields: JSON.stringify({}),
      limits: JSON.stringify(limits),
    };
    const facetParams = {
      fields: JSON.stringify({ mode: {} }),
      facets: JSON.stringify(facets),
    };

    const fullQueryURL = buildUriWithParam({
      resource,
      endpoint: 'fullquery',
      params: queryParams,
    });
    const fullFacetURL = buildUriWithParam({
      resource,
      endpoint: 'fullfacet',
      params: facetParams,
    });

    try {
      const [data, count] = await Promise.all([
        fetchResource(fullQueryURL, meta?.method),
        fetchResource(fullFacetURL, meta?.method),
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
    const findAllURL = buildUriWithParam({
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
