import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function Employee({ employee }) {
  return (
    <Card className='card-employes'>
      <Card.Body>
        <Card.Title className='text-center bg-secondary-green rounded p-2'>{employee.name}</Card.Title>
        {employee.imgUrl && <Card.Img variant="top" className='rounded mb-3' src={employee.imgUrl} alt={employee.name} />}
        {employee.subordinates && (
          <div>
            <Card.Title>Bawahan:</Card.Title>
            <ListGroup>
              {employee.subordinates.map(subordinate => (
                <ListGroup.Item key={subordinate.id}>
                  <Employee employee={subordinate} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
        <Card.Text className='bg-secondary-green p-2 font-card-employe rounded'>
          <table>
            <tbody>
              <tr><td>Jabatan</td><td>:</td><td>{employee.job}</td></tr>
              <tr><td>Kontak</td><td>:</td><td>{employee.contact}</td></tr>
            </tbody>
          </table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Employee;
