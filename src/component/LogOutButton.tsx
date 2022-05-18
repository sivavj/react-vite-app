export default function LogOutButton({
  isLogged,
  setLoggedIn,
}: {
  isLogged: boolean;
  setLoggedIn: any;
}) {
  return (
    <div>
      <button className="btn btn-danger" onClick={() => setLoggedIn(true)}>
        {isLogged ? "Logout" : "Login"}
      </button>
    </div>
  );
}
