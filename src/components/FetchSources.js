import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const FetchSources = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await api.get('/sources', {
          params: {
            apiKey: '8018484aac554ecfa4a883422b34f15f', // Your API key
            category: 'business,entertainment,general,health,science,sports,technology', // All categories
            language: 'ar,de,en,es,fr,he,it,nl,no,pt,ru,se,ud,zh', // All languages
            country: 'ae,ar,at,au,be,bg,br,ca,ch,cn,co,cu,cz,de,eg,fr,gb,gr,hk,hu,id,ie,il,in,it,jp,kr,lt,lv,ma,mx,my,ng,nl,no,nz,ph,pl,pt,ro,rs,ru,sa,se,sg,si,sk,th,tr,tw,ua,us,ve,za', // All countries
          },
        });

        if (response.data.status === 'ok') {
          setSources(response.data.sources);
        } else {
          throw new Error(response.data.message || 'Failed to fetch sources');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching sources:', error);
        setError(error.message || 'Unknown error');
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching sources: {error}</div>;
  }

  return (
    <div className="sources-list">
      <h2>Available News Sources</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.id}>{source.name} ({source.country})</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchSources;
