import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/users", {
        name,
        email,
        password,
        password_confirmation: password,
      });

      navigate("/users");
    } catch (err) {
      alert("Erro ao criar usuário");
    }
  }

  return (
    <div className="container-principal">
    <div className="cadastro-container">
      <h1>Criar Usuário</h1>

      <form className="cadastro-form" onSubmit={handleCreate}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br/><br/>

        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/><br/>

        <input 
          type="password" 
          placeholder="Senha" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Salvar</button>
      </form>
    </div>
    </div>
  );
}
