import { use, useEffect, useState } from "react";
import { addEmployee, updateEmployee } from "../service/EmployeeService";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function AddComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();

  const employee = state?.employee;

  useEffect(() => {
    if(id && employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
    }
  }, [id, employee]);

  function saveEmployee(e) {
    e.preventDefault();

    if(validateForm()) {
      const employee = { firstName, lastName, email };
      console.log("Employee to be saved:", employee);

      if(id) {
        updateEmployee(id, employee).then(response => {
          navigate('/employees');
        }).catch(error => {
          console.error("Error updating employee:", error);
        });
      } else {
        addEmployee(employee).then(response => {
          navigate('/employees');
        }).catch(error => {
          console.error("Error adding employee:", error);
        });
      }
    }
  }

  function validateForm() {
    let isValid = true;
    
    const errorCopy = {... errors};

    errorCopy.firstName = '';
    errorCopy.lastName = '';
    errorCopy.email = '';

    if(firstName.trim() === '') {
      errorCopy.firstName = 'First Name is required';
      isValid = false;
    }

    if(lastName.trim() === '') {
      errorCopy.lastName = 'Last Name is required';
      isValid = false;
    }

    if(email.trim() === '') {
      errorCopy.email = 'Email is required';
      isValid = false; 
    }

    if(!isValidEmail(email)) {
      errorCopy.email = 'Email is not valid';
      isValid = false;
    }

    setErrors(errorCopy);

    return isValid;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function pageTitle() {
    if(id) {
      return <h2 className="text-center p-2">Update Employee</h2>;
    }
    return <h2 className="text-center p-2">Add Employee</h2>;
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <button className="btn btn-success" type="submit" onClick={saveEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddComponent;
