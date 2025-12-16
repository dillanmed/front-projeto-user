import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");

    if (currentUser) {
      setUser(JSON.parse(currentUser));  
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ padding: 20 }}>
      <div className="page-container">
      <h1>Bem-vindo, {user?.name}</h1>

      <div className="button-group">
        <button className="primary" onClick={() => navigate("/users")}>Gerenciar Usuários</button>
        <button  className= "secondary" onClick={() => navigate("/users/new")}>Cadastrar Usuário</button>
      </div>
      </div>
      
    </div>
  );
}
