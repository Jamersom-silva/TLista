export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} ToDofy — Organização simples e eficiente.
      </div>
    </footer>
  );
}
