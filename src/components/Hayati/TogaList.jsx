import React, { useEffect, useState } from 'react';
import TogaItem from './TogaItem';
import api from '../../utils/api';

function TogaList() {
  const [togas, setTogas] = useState([]);

  useEffect(() => {
    async function fetchTogas() {
      try {
        const data = await api.getAllTogas();
        setTogas(data);
      } catch (error) {
        console.error('Error fetching togas:', error);
      }
    }

    fetchTogas();
  }, []);

  return (
    <div className="container">
        <div className="row">
          {togas.map((toga) => (
            <TogaItem key={toga.id} toga={toga} />
          ))}
        </div>
      </div>
  );
}

export default TogaList;
