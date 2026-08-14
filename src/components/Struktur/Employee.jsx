import { FaIdBadge } from 'react-icons/fa';

function Employee({ employee, isHead }) {
  return (
    <div className={`employee-card ${isHead ? 'employee-head' : ''}`}>
      <div className="employee-avatar">
        {employee.imgUrl ? (
          <img src={employee.imgUrl} alt={employee.name} loading="lazy" decoding="async" />
        ) : (
          <span>{(employee.name || '?').charAt(0)}</span>
        )}
      </div>
      <h5 className="employee-name">{employee.name}</h5>
      <span className="employee-job">{employee.job}</span>
      {employee.contact && (
        <span className="employee-contact">
          <FaIdBadge size={11} /> {employee.contact}
        </span>
      )}
      {employee.subordinates && employee.subordinates.length > 0 && (
        <div className="employee-subordinates">
          {employee.subordinates.map((subordinate) => (
            <Employee key={subordinate.id} employee={subordinate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Employee;
