import { Spinner } from 'react-bootstrap'

function LoadingScreen({ height = '60vh' }) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: height, background: '#f9f9f9' }}>
      <Spinner animation="border" variant="success" role="status">
        <span className="visually-hidden">Memuat...</span>
      </Spinner>
    </div>
  )
}

export default LoadingScreen
