export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 py-4 border-t">
      <div className="max-w-5xl mx-auto text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} ToDofy — Planejamento Fácil e Organizado</p>
        <p className="mt-1">Desenvolvido por Jamersom Silva 🚀</p>
      </div>
    </footer>
  );
}
