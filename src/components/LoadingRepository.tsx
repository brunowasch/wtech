import { Header } from "./Header";
import loadingImg from "../assets/loading.png";

export function LoadingRepository() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-3xl h-[450px] rounded-lg shadow-md flex flex-col items-center justify-center">
          <img
            src={loadingImg}
            alt="Carregando"
            className="w-12 h-12 animate-spin"
          />
          <p className="mt-4 text-gray-700 font-bold text-lg">Carregando...</p>
        </div>
      </main>
    </div>
  );
}
