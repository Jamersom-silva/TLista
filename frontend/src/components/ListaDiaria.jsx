import React, { useState } from "react";
import { CalendarCheck } from "lucide-react";
import jsPDF from "jspdf";

export default function ListaDiaria() {
  const [texto, setTexto] = useState("");

  function baixarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Planejamento do Dia", 14, 20);

    const linhas = doc.splitTextToSize(texto || " ", 180);
    doc.setFontSize(12);
    doc.text(linhas, 14, 35);

    doc.save("planejamento-dia.pdf");
  }

  return (
    <div className="
      bg-white/80 backdrop-blur-lg 
      rounded-3xl p-10
      shadow-[0_8px_40px_rgba(0,0,0,0.07)]
      border border-gray-200
      transition
    ">
      {/* TÍTULO COM ÍCONE */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-green-100 text-green-700">
          <CalendarCheck size={22} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Planejamento do Dia
        </h2>
      </div>

      {/* SUBTÍTULO */}
      <label className="font-semibold text-gray-700 tracking-wide mb-2 block">
        Atividades
      </label>

      {/* TEXTAREA MODERNA */}
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva aqui seu planejamento do dia..."
        className="
          w-full min-h-[220px] p-5 rounded-2xl
          bg-gray-50/80 border border-gray-300
          shadow-inner text-gray-800
          transition-all
          focus:outline-none focus:ring-4 focus:ring-green-200 
        "
      ></textarea>

      {/* BOTÃO PREMIUM */}
      <button
        onClick={baixarPDF}
        className="
          mt-8 px-6 py-3
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
