import { useRegister } from "../../api/authApi";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";

export default function Register() {
  const { register } = useRegister();
  const { userLoginHandler } = useUserContext();
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    const email = data.email;
    const password = data.password;
    const rePass = data["confirm-password"];

    if (password !== rePass) {
      toast.error("Passwords not match!");
      e.currentTarget.elements["password"].value = "";
      e.currentTarget.elements["confirm-password"].value = "";
      return;
    }
    try {
      const authData = await register(email, password);

      userLoginHandler(authData);

      toast.success("You are registered!");

      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed!");
    }
  };

  return (
    <section id="register-page" className="content auth">
      <form id="register" onSubmit={registerHandler}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Register</h1>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="maria@email.com"
          />

          <label htmlFor="pass">Password:</label>
          <input type="password" name="password" id="register-password" />

          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
          />

          <input className="btn submit" type="submit" value="Register" />

          <p className="field">
            <span>
              If you already have profile click <a href="#">here</a>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
