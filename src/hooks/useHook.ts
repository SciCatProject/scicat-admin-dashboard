import { useEffect, useState } from 'react';
import { API_URL } from '../contexts/constant';

export const useCount = (resource: string) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const fields = {
          mode: {},
        };
        const facets = ['type', 'creationLocation', 'ownerGroup', 'keywords'];
        const fullFacetParams = `fields=${encodeURIComponent(
          JSON.stringify(fields)
        )}&facets=${encodeURIComponent(JSON.stringify(facets))}`;
        const fullFacetURL = `${API_URL}/${resource}/fullfacet?${fullFacetParams}`;

        const fullFacetRes = await fetch(fullFacetURL);

        if (!fullFacetRes.ok) {
          throw new Error('Network response was not ok');
        }

        const countData = await fullFacetRes.json();
        setTotal(countData[0]?.all[0]?.totalSets);
      } catch (err) {
        setTotal(0);
        console.error('Error in useCount:', err);
      }
    };

    fetchCount();
  }, [resource]);

  return { total };
};
