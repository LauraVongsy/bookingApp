function Login({ onSubmit }) {
  return (
    <>
      <h1>Veuillez vous connecter.</h1>
      <form onSubmit={onSubmit}>
        <input id="login"></input>
        <input id="password"></input>
        <button>Valider</button>
      </form>
    </>
  );
}

export default Login;
