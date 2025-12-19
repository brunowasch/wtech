import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SideIcon } from "../components/Login/SideIcon";
import { LoginInput } from "../components/Login/LoginInput";
import { LoginError } from "../components/Login/LoginError";

export function Login() {
  const [username, setUsername] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const hasError = searchParams.get("error") === "user_not_found";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setSearchParams({});
      navigate(`/profile/${username}`);
    }
  };

  const handleCloseError = () => {
    setSearchParams({});
  };

  return (
    <main className="flex h-screen w-full">
      <section className="hidden md:flex w-1/2">
        <SideIcon />
      </section>

      <section className="w-full md:w-1/2 flex flex-col items-center justify-center bg-[#F1F1F1] px-6">
        <div className="w-full max-w-[360px] flex flex-col gap-8 relative">
          {hasError && <LoginError onClose={handleCloseError} />}

          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Entrar
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <LoginInput
              label="Usuário"
              placeholder="Digite aqui seu usuário do Github"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-[#05478A] text-white font-bold py-3 rounded-md hover:bg-[#043a72] transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
