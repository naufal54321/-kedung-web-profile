import { useEffect, useState } from 'react';
import { getAllKedungs } from '../../utils/kedungs';
import KedungCard from './KedungCard';

const KedungList = () => {
  const [kedungs, setKedungs] = useState([]);

  useEffect(() => {
    const allKedungs = getAllKedungs();
    setKedungs(allKedungs);
  }, []);

  const mainMap = kedungs.find(k => k.isMain);
  const rtMaps = kedungs.filter(k => !k.isMain);

  return (
    <>
      {mainMap && (
        <div className="row g-3 mb-4">
          <div className="col-12">
            <div className="kedung-card kedung-card-main">
              <div className="kedung-card-header">
                <span className="kedung-card-badge">Peta Utama</span>
                <h5 className="kedung-card-name">{mainMap.name}</h5>
              </div>
              <div className="kedung-card-map main">
                <iframe
                  src={mainMap.link}
                  title={mainMap.name}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row g-3">
        {rtMaps.map(kedung => (
          <KedungCard key={kedung.id} kedung={kedung} />
        ))}
      </div>
    </>
  );
};

export default KedungList;
