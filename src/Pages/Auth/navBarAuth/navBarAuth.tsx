import { Link } from "react-router-dom";

function NavBarAuthComponent() {
  return (
    <div>
      <ul>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </ul>
    </div>
  );
}

export default NavBarAuthComponent;
