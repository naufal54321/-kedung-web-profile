import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function DropdownButton () {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='success' className='bg-transparent text-dark border-light' id="dropdown-basic">
        Profile Dusun
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/Sejarah">Sejarah</Dropdown.Item>
        <Dropdown.Item as={Link} to="/Struktur-Pemerintahan">Struktur Pemerintahan</Dropdown.Item>
        <Dropdown.Item as={Link} to="/Visi-Misi">Visi dan Misi</Dropdown.Item>
        <Dropdown.Item as={Link} to="/Hayati-NonHayati">Sumber Hayati & Non-Hayati</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
