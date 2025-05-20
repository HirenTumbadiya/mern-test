export default function AdminLogin() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Admin Login</h1>
      <form className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
