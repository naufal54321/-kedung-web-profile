import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Employee from './Employee';

function OrganizationChart({ data }) {
  // Separate head of village and other employees
  const headOfVillage = Object.values(data).find(employee => employee.isHead);
  const otherEmployees = Object.values(data).filter(employee => !employee.isHead);

  const renderEmployees = (employees) => {
    return employees.map((employee) => (
      <Col key={employee.id} className="d-flex justify-content-center">
        <Employee employee={employee} />
      </Col>
    ));
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {/* Render head of village separately */}
        {headOfVillage && (
          <Col className="d-flex justify-content-center">
            <Employee employee={headOfVillage} />
          </Col>
        )}
      </Row>
      {otherEmployees.length > 0 && (
        <Row className="justify-content-center mt-4">
          {/* Render other employees */}
          {renderEmployees(otherEmployees)}
        </Row>
      )}
    </Container>
  );
}

export default OrganizationChart;
