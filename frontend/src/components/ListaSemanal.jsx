import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import jsPDF from "jspdf";

export default function ListaSemanal() {
  const dias = [
    "SEGUNDA",
    "TERÇA",
    "QUARTA",
    "QUINTA",
    "SEXTA",
    "SÁBADO",
    "DOMINGO",
  ];

  const [semanal, setSemanal] = useState({
    SEGUNDA: "",
    TERÇA: "",
    QUARTA: "",
    QUINTA: "",
    SEXTA: "",
    SÁBADO: "",
    DOMINGO: "",
  });

  function atualizar(dia, texto) {
    setSemanal((p) => ({ ...p, [dia]: texto }));
  }

  function baixarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Planejamento Semanal", 14, 20);

    let y = 38;

    dias.forEach((dia) => {
      doc.setFontSize(14);
      doc.text(`${dia}:`, 14, y);
      y += 8;

      const linhas = doc.splitTextToSize(semanal[dia] || " ", 180);
      doc.setFontSize(11);
      doc.text(linhas, 14, y);
      y += linhas.length * 6 + 8;
    });

    doc.save("planejamento-semanal.pdf");
  }

  return (
    <div
      className="
        bg-white/80 backdrop-blur-lg 
        rounded-3xl p-10
        shadow-[0_8px_40px_rgba(0,0,0,0.07)]
        border border-gray-200
      "
    >
      {/* TÍTULO PREMIUM */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-green-100 text-green-700">
          <CalendarDays size={22} />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Planejamento Semanal
        </h2>
      </div>

      {/* GRID PREMIUM EM DUAS COLUNAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dias.map((dia) => (
          <div
            key={dia}
            className="
              bg-white border border-gray-200 rounded-2xl p-5 
              shadow-sm hover:shadow-md transition
            "
          >
            <label className="font-semibold text-gray-800 block mb-2">
              {dia}
            </label>

            <textarea
              value={semanal[dia]}
              onChange={(e) => atualizar(dia, e.target.value)}
              placeholder={`Atividades de ${dia.toLowerCase()}...`}
              className="
                w-full min-h-[130px] p-4 rounded-xl border border-gray-300
                bg-gray-50 shadow-inner text-gray-700
                focus:outline-none focus:ring-4 focus:ring-green-200
              "
            ></textarea>
          </div>
        ))}
      </div>

      {/* BOTÃO PREMIUM */}
      <button
        onClick={baixarPDF}
        className="
          mt-10 px-6 py-3
          rounded-xl font-medium text-white
          bg-gradient-to-r from-green-600 to-green-700 
          shadow-lg hover:scale-[1.02] active:scale-[0.97]
          transition-all
        "
      >
        Baixar (.pdf)
      </button>
    </div>
  );
}
