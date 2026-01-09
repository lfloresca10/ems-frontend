import React, { useState, useEffect, use } from "react";
import { deleteEmployee, getEmployees } from "../service/EmployeeService";
import { useNavigate } from "react-router-dom";

const EmployeeComponent = () => {
  
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees().then((response) => {
      setEmployees(response.data);
    }).catch((error) => {
      console.error("Error fetching employees:", error);
    });
  }, []);

  function addNewEmployee() {
    navigate('/add-employee');
  }

  function deleteEmployeeById(id) {
    deleteEmployee(id).then((response) => {
      // alert("Employee deleted successfully!");
      navigate(0); // Refresh the page to update the employee list
    }).catch((error) => {
      console.error("Error deleting employee:", error);
    });
  }

  function updateEmployee(id, employee) {
    navigate(`/edit-employee/${id}`, {
        state: { employee}
    });
  }

  return (
    <div className='container'>
      <h2 className="text-center my-4">Employee List</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button className="btn btn-info me-md-2" onClick={() => updateEmployee(employee.id, employee)}>Update</button>
                <button className="btn btn-danger" onClick={() => deleteEmployeeById(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeComponent;
