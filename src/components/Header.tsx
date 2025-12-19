import logoHeader from "../assets/wtech-logoname-blue.png";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-10">
      <img src={logoHeader} alt="Logo" className="h-8 w-auto" />
    </header>
  );
}
