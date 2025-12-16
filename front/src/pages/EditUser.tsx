import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🛠️ Mantenha os campos de formulário em um estado separado.
  // Inicialize-os como strings vazias para evitar problemas de componente não controlado.
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(true); // Novo estado de carregamento

  async function loadUser() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🎯 Define o formData com os dados do usuário carregado
      setFormData({ 
        name: response.data.name, 
        email: response.data.email 
      });
      
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      // Opcional: Redirecionar ou mostrar mensagem de erro
    } finally {
      setIsLoading(false); // Termina o carregamento
    }
  }

  // Novo manipulador para atualizar o estado do formulário de forma genérica
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      
      // ⚠️ ADICIONAL: Implemente aqui uma VERIFICAÇÃO de que o usuário logado
      // é o mesmo que está sendo editado (ID vindo do token vs. ID do `useParams`).
      // Isso é essencial para segurança no backend e frontend.
      
      await api.patch(
        `/users/${id}`,
        {
          name: formData.name, // Usa o estado formData
          email: formData.email, // Usa o estado formData
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      navigate("/users");

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      // Mostrar feedback ao usuário
    }
  }

  useEffect(() => {
    loadUser();
  }, [id]); // Dependência de 'id' é boa prática

  if (isLoading) return <p>Carregando...</p>; // Usa o novo estado

  return (
    <div className="container=principal">
      <div className="edicao-container">
      <h1>Editar Usuário</h1>

      <form className="edicao-form" onSubmit={handleUpdate}>
        <input 
          type="text" 
          name="name" // 🔑 Adiciona a propriedade 'name'
          value={formData.name} // Usa formData
          onChange={handleChange} // Usa handleChange
        /><br/><br/>

        <input 
          type="email" 
          name="email" // 🔑 Adiciona a propriedade 'name'
          value={formData.email} // Usa formData
          onChange={handleChange} // Usa handleChange
        /><br/><br/>

        <button type="submit">Atualizar</button>
      </form>
    </div>
    </div>
  );
}