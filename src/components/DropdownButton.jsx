import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { FaHistory, FaUsers, FaBullseye, FaLeaf, FaHandshake } from 'react-icons/fa';

function DropdownButton() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='success' className='bg-transparent text-dark border-0 fw-medium' id="dropdown-basic">
        Profile Padukuhan
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm border-0 mt-2">
        <Dropdown.Item as={Link} to="/Sejarah" className="py-2 d-flex align-items-center gap-2">
          <FaHistory className="text-success" /> Sejarah
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/Struktur-Pemerintahan" className="py-2 d-flex align-items-center gap-2">
          <FaUsers className="text-success" /> Struktur Pemerintahan
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/Lembaga-Masyarakat" className="py-2 d-flex align-items-center gap-2">
          <FaHandshake className="text-success" /> Lembaga Masyarakat
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/Visi-Misi" className="py-2 d-flex align-items-center gap-2">
          <FaBullseye className="text-success" /> Visi dan Misi
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/Hayati-NonHayati" className="py-2 d-flex align-items-center gap-2">
          <FaLeaf className="text-success" /> Sumber Hayati & Non-Hayati
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
