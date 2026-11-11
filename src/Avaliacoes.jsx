import { useEffect, useState } from "react";
import { API_URL, RECURSO, TITULO, TITULO_FORM, CAMPOS_FORM, COLUNAS } from "./config";

// Monta o objeto vazio do formulario a partir dos campos do config.js
const formVazio = () =>
  Object.fromEntries(CAMPOS_FORM.map((campo) => [campo.nome, ""]));

export default function Avaliacoes({ token }) {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [formData, setFormData] = useState(formVazio());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Le a mensagem de erro que o Spring devolve (campo "message")
  const lerErro = async (response, padrao) => {
    try {
      const corpo = await response.json();
      return corpo.message || corpo.error || `${padrao} (HTTP ${response.status})`;
    } catch {
      return `${padrao} (HTTP ${response.status})`;
    }
  };

  // ---------- GET /tarefas ----------
  const listar = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/${RECURSO}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(await lerErro(response, "Erro ao listar"));
      }

      setItens(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // ---------- Delete /tarefas ----------
  const deletar = async (id) => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${RECURSO}/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(await lerErro(response, "Erro ao deletar"));
        }

       } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  // ---------- POST /tarefas ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSucesso("");

    // Converte campos numericos de texto para numero e remove os vazios
    const corpo = {};
    for (const campo of CAMPOS_FORM) {
      const valor = formData[campo.nome];
      if (valor === "") continue;
      corpo[campo.nome] = campo.tipo === "number" ? Number(valor) : valor;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API_URL}/${RECURSO}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(corpo),
      });

      if (!response.ok) {
        throw new Error(await lerErro(response, "Erro ao cadastrar"));
      }

      const novo = await response.json();
      setItens((prev) => [...prev, novo]);
      setFormData(formVazio());
      setSucesso("Cadastrado com sucesso!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatar = (valor, tipo) => {
    if (valor === null || valor === undefined) return "-";
    if (tipo === "data") {
      const data = new Date(valor);
      return isNaN(data) ? valor : data.toLocaleString("pt-BR");
    }
    return String(valor);
  };

  const renderCampo = (campo) => {
    const props = {
      id: campo.nome,
      name: campo.nome,
      value: formData[campo.nome],
      onChange: handleInputChange,
      required: campo.obrigatorio,
    };

    if (campo.tipo === "textarea") {
      return <textarea rows={3} {...props} />;
    }

    if (campo.tipo === "select") {
      return (
        <select {...props}>
          <option value="">Selecione</option>
          {(campo.opcoes || []).map((op) => (
            <option key={op.valor} value={op.valor}>{op.label}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={campo.tipo || "text"}
        min={campo.min}
        max={campo.max}
        step={campo.step}
        {...props}
      />
    );
  };

  return (
    <>
      {error && <div className="erro">{error}</div>}
      {sucesso && <div className="sucesso">{sucesso}</div>}

      { (
        <div className="card">
          <h2>{TITULO_FORM}</h2>
          <form onSubmit={handleSubmit} className="form">
            {CAMPOS_FORM.map((campo) => (
              <div key={campo.nome} className="campo">
                <label htmlFor={campo.nome}>{campo.label}</label>
                {renderCampo(campo)}
              </div>
            ))}
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? "Salvando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="cabecalho">
          <h2>{TITULO}</h2>
          <button className="btn btn-secundario" onClick={listar}>Atualizar</button>
        </div>

        {loading ? (
          <p className="cinza">Carregando...</p>
        ) : itens.length === 0 ? (
          <p className="cinza">Nenhum registro cadastrado ainda.</p>
        ) : (
          <div className="tabela-wrapper">
            <table>
              <thead>
                <tr>
                  {COLUNAS.map((col) => <th key={col.nome}>{col.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {itens.map((item, i) => (
                  <tr key={item.id ?? i}>
                    {COLUNAS.map((col) => (
                      <td key={col.nome}>{formatar(item[col.nome], col.tipo)} <button className="btn btn-secundario" onClick={deletar(item.id)}>Deletar</button></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
