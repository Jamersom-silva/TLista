import React, { useState } from "react";
import jsPDF from "jspdf";

export default function ListaSemanal() {

  const dias = [
    "SEGUNDA",
    "TERÇA",
    "QUARTA",
    "QUINTA",
    "SEXTA",
    "SÁBADO",
    "DOMINGO"
  ];

  const [semanal, setSemanal] = useState({
    SEGUNDA: "",
    TERÇA: "",
    QUARTA: "",
    QUINTA: "",
    SEXTA: "",
    SÁBADO: "",
    DOMINGO: ""
  });

  function atualizarDia(dia, texto) {
    setSemanal(prev => ({ ...prev, [dia]: texto }));
  }

  // 🔥 BAIXAR EM PDF — CORRIGIDO
  function baixarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Planejamento Semanal", 14, 20);

    doc.setFontSize(12);

    let y = 35;

    Object.keys(semanal).forEach(dia => {
      doc.text(`${dia}:`, 14, y);
      y += 8;

      const linhas = doc.splitTextToSize(semanal[dia] || " ", 180);
      doc.text(linhas, 14, y);
      y += linhas.length * 7 + 5;
    });

    doc.save("planejamento-semanal.pdf");
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
    marginBottom: "15px",
    background: "#fafafa"
  };

  const textareaStyle = {
    width: "100%",
    height: "80px",
    marginTop: "8px",
    borderRadius: "6px",
    border: "2px solid #bbb",
    padding: "8px",
    resize: "none",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>PLANEJAMENTO SEMANAL</h2>

      {dias.map((dia) => (
        <div key={dia} style={boxStyle}>
          <strong>{dia}</strong>

          <textarea
            style={textareaStyle}
            value={semanal[dia]}
            onChange={(e) => atualizarDia(dia, e.target.value)}
            placeholder={`Atividades de ${dia.toLowerCase()}...`}
          />
        </div>
      ))}

      <button onClick={baixarPDF} style={{ marginTop: "20px" }}>
        Baixar (.pdf)
      </button>
    </div>
  );
}
