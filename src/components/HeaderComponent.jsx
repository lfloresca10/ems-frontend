import { useNavigate } from "react-router-dom";

function HeaderComponent() {

  const navigate = useNavigate();

  function goToHome() {
    navigate('/');
  }

  return (
    <header className="navbar navbar-dark bg-dark text-white p-2">
      <h2 onClick={goToHome} style={{ cursor: "pointer" }}>Employee Management System</h2>
    </header>
  );
}

export default HeaderComponent;