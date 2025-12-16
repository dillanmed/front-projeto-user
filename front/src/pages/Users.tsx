import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";



export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  
  const loggedUserId = String(localStorage.getItem("userId")); 

  

  async function loadUsers() {
    const token = localStorage.getItem("token");

    
    try {
        const response = await api.get("/users", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
    } catch (error) {
        console.error("Erro ao carregar usuários:", error);
     
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function handleEdit(userId: string) {
    if (userId !== loggedUserId) {
      alert("Não é possível editar");
      return;
    }

    window.location.href = `/users/${userId}/edit`;
  }
  

  async function handleDelete(userId: string, userName: string) {
   
    if (userId !== loggedUserId) {
        alert("Erro de autorização: Você só pode excluir sua própria conta.");
        return;
    }

    
    const isConfirmed = window.confirm(
        `Tem certeza que deseja excluir sua conta (${userName})? Esta ação é irreversível.`
    );

    if (!isConfirmed) {
        return; 
    }

   
    const token = localStorage.getItem("token");

    try {
      await api.delete("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        });

   
        alert("Conta excluída com sucesso!");
        
       
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/login"; 
        
     

    } catch (error: any) {
        console.error("Erro ao excluir usuário:", error);
       
        const errorMessage = error.response?.data?.error || "Erro ao excluir conta.";
        alert(errorMessage);
    }
  }

  const renderActions = (id: string) => {
    const isCurrentUser = id === loggedUserId;
    if (!isCurrentUser) {
      return null;
    }
    return (
      <span className="actions-span" style={{ display: "flex", gap: 8 }}>
        <Link to="/users/me/edit">
          EDITAR
        </Link>
        <button
          onClick={() => handleDelete(id, users.find(u => u.id === id)?.name || "")}
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "none",
            padding: 0,
            color: "red",
            fontSize: "1em"
          }}
        >
          EXCLUIR
        </button>
      </span>
    );
  };

  return (
    <div className="container-principal">
      <div className="user-list-container">
      <h1>Usuários</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
           {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{renderActions(String(u.id))}</td>
            </tr>
           ))}
        </tbody>
          
      </table>
      </div>
      </div>
    
  );
}