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
    // 1. LOGIN: Obter apenas o TOKEN
    const resLogin = await api.post("/auth/login", { email, password });
    const token = resLogin.data.token;
    
    // 2. SALVAR TOKEN
    localStorage.setItem("token", token);
    
    // 3. BUSCAR DADOS DO USUÁRIO USANDO O TOKEN
    // Agora, o `api` usará o token salvo para esta requisição `/me`
    const resMe = await api.get("/users/me"); 
    const user = resMe.data; // A resposta de /me é o objeto user

    // 4. SALVAR ID E DADOS COMPLETOS
    localStorage.setItem("userId", String(user.id));
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/dashboard");
  } catch (err) {
    alert("Erro ao fazer login ou carregar dados do usuário.");
  }
}

   return (
    <div className="container-principal">
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
    </div>
  );
}
