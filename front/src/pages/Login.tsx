import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // SALVAR TOKEN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", String(res.data.user.id));
      localStorage.setItem("user", JSON.stringify(res.data.user));


      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao fazer login");
    }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /> <br />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)} 
      /> <br />

      <button id="login" type="submit">Entrar</button>
    </form>
  );
}
