import React, { useState } from "react";
import jsPDF from "jspdf";

export default function ListaDiaria() {

  const [texto, setTexto] = useState("");

  // 🔥 BAIXAR EM PDF — CORRIGIDO
  function baixarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Planejamento do Dia", 14, 20);

    doc.setFontSize(12);
    const linhas = doc.splitTextToSize(texto || " ", 180);

    doc.text(linhas, 14, 35);

    doc.save("planejamento-dia.pdf");
  }

  const containerStyle = {
    maxWidth: "700px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    border: "6px solid #333",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "1px"
  };

  const boxStyle = {
    border: "3px solid #555",
    padding: "10px",
    borderRadius: "6px",
    background: "#fafafa"
  };

  const textareaStyle = {
    width: "100%",
    height: "350px",
    marginTop: "8px",
    borderRadius: "6px",
    border: "2px solid #bbb",
    padding: "12px",
    resize: "none",
    fontSize: "15px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>PLANEJAMENTO DO DIA</h2>

      <div style={boxStyle}>
        <strong>TAREFAS</strong>

        <textarea
          style={textareaStyle}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreva aqui seu planejamento do dia..."
        />
      </div>

      <button onClick={baixarPDF} style={{ marginTop: "20px" }}>
        Baixar (.pdf)
      </button>
    </div>
  );
}
