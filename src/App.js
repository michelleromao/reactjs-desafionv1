import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("repository").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repository", {
      title: "Desafio 04",
      url: "github.io/michelleromao",
      techs: "node.js, backend",
    });

    const repositorie = response.data;
    setRepository([...repository, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repository/${id}`);

    setRepository(repository.filter((repositorie) => repositorie.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
