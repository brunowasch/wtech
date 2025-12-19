import { SideIcon } from "../components/Login/SideIcon";
import loadingImg from "../assets/loading.png";

export function LoadingProfile() {
  return (
    <main className="flex h-screen w-full">
      <section className="hidden md:flex w-1/2">
        <SideIcon />
      </section>
      <section className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <img
            src={loadingImg}
            alt="Carregando"
            className="w-12 h-12 animate-spin"
          />

          <p className="text-[#333333] font-bold text-lg">Carregando...</p>
        </div>
      </section>
    </main>
  );
}
