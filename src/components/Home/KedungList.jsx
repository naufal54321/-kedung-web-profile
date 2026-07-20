import React, { useEffect, useState } from 'react';
import { getAllKedungs } from '../../utils/kedungs';
import KedungCard from './KedungCard';

const KedungList = () => {
  const [kedungs, setKedungs] = useState([]);

  useEffect(() => {
    const fetchKedungs = async () => {
      const allKedungs = getAllKedungs();
      setKedungs(allKedungs);
    };

    fetchKedungs();
  }, []);

  return (
    <div className="container mb-4 d-flex flex-wrap gap-4 justify-content-center mx-auto">
      {kedungs.map(kedung => (
        <KedungCard key={kedung.id} kedung={kedung} />
      ))}
    </div>
  );
};

export default KedungList;
