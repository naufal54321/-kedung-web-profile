import { useEffect } from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css'

const AlmaAtaWebPreview = () => {
  useEffect(()=> {
    Aos.init();
  }, [])
  return (
    <div className='bg-white p-4 mb-3 rounded' data-aos="zoom-in-right">
      <h5 className='font-size-bolder text-center mb-3'>Website Universitas Alma Ata</h5>
      <iframe className="embed-responsive-item iframe-height" src="https://almaata.ac.id/" title="Universitas Alma Ata" width="100%" style={{ border: 'none' }}></iframe>
    </div>
  );
};

export default AlmaAtaWebPreview;
