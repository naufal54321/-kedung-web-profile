import React from 'react';

const WartaWebsitePreview = () => {
  return (
    <div className='bg-white p-4 mb-3 rounded'>
      <h5 className='text-center mb-3'>Warta Pendidikan Jogja</h5>
      <iframe className="embed-responsive-item iframe-height" src="https://wartapendidikanjogja.com/" title="Warta Pendidikan Jogja" width="100%" style={{ border: 'none' }}></iframe>
    </div>
  );
};

export default WartaWebsitePreview;
