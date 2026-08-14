import Employee from './Employee';

function OrganizationChart({ data }) {
  const headOfVillage = Object.values(data).find(employee => employee.isHead);
  const otherEmployees = Object.values(data).filter(employee => !employee.isHead);

  return (
    <div className="org-chart">
      {headOfVillage && (
        <div className="org-head">
          <Employee employee={headOfVillage} isHead />
        </div>
      )}
      {otherEmployees.length > 0 && (
        <div className="org-team">
          {otherEmployees.map((employee) => (
            <Employee key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrganizationChart;
