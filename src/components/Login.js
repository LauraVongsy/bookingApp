import { useContext } from "react";
import { UserContext } from "./UserContext";

function Login() {
  const { isUserIncluded } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    isUserIncluded(e.target.login.value, e.target.password.value);
  };

  return (
    <>
      <h1>Veuillez vous connecter.</h1>
      <form onSubmit={handleSubmit}>
        <input id="login"></input>
        <input id="password"></input>
        <button>Valider</button>
      </form>
    </>
  );
}

export default Login;
