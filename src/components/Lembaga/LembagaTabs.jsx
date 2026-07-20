import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function LembagaTabs() {
  return (
    <Tabs
      defaultActiveKey="pemuda-pemudi"
      id="fill-tab-example"
      className="mb-3 mx-4"
      fill
    >
      <Tab eventKey="pkk" title="PKK" className='p-4'>
        <div className='mx-auto d-flex justify-content-center p-4'>
            <img className='img-fluid rounded mb-5' src="/img/lembaga/pkk.jpeg" alt="struktur pkk" />
        </div>
      </Tab>
      <Tab eventKey="pemuda-pemudi" title="Pemuda-Pemudi" className='p-4'>
        <div className='mx-auto d-flex justify-content-center p-4'>
            <img className='img-fluid rounded mb-5' src="/img/lembaga/pemuda-pemudi.jpeg" alt="struktur pemuda-pemudi" />
        </div>
      </Tab>
      <Tab eventKey="lpmk" title="LPMK" className='p-4'>
        <div className='mx-auto d-flex justify-content-center p-4'>
            <img className='img-fluid rounded mb-5' src="/img/lembaga/lpmk.jpeg" alt="struktur lpmk" />
        </div>
      </Tab>
    </Tabs>
  );
}

export default LembagaTabs;
