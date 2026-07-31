import UmkmItem from './UmkmItem';

const UmkmList = ({ umkmList }) => {
  return (
    <div className="row g-4">
      {umkmList.map((umkm, index) => {
        const isFeatured = index === 0;
        return (
          <div key={umkm.id} className={isFeatured ? 'col-lg-6' : 'col-md-6 col-lg-6'}>
            <UmkmItem umkm={{ ...umkm, isFeatured }} />
          </div>
        );
      })}
    </div>
  );
};

export default UmkmList;
