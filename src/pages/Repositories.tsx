import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { LoadingRepository } from "../components/LoadingRepository";

interface RepoDetail {
  name: string;
  html_url: string;
  visibility: string;
  language: string;
  description: string;
}

export function Repositories() {
  const { username, repoName } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState<RepoDetail | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${repoName}`)
      .then((res) => res.json())
      .then((data) => setRepo(data));
  }, [username, repoName]);

  if (!repo) return <LoadingRepository />;

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <Header />
      <main className="max-w-5xl mx-auto mt-8 p-12 bg-white rounded-lg shadow-sm min-h-[600px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">
          Especificações
        </h2>

        <div className="max-w-2xl mx-auto relative border border-gray-100 rounded-xl p-8 bg-white shadow-lg">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            x
          </button>

          <h3 className="text-lg font-bold text-blue-900 border-b pb-4 mb-6">
            {repo.name}
          </h3>

          <div className="space-y-4">
            <section>
              <span className="text-[10px] text-gray-400 uppercase font-bold">
                Link
              </span>
              <div className="bg-gray-50 p-3 rounded-md mt-1">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-700 underline"
                >
                  {repo.html_url}
                </a>
              </div>
            </section>

            <section>
              <span className="text-[10px] text-gray-400 uppercase font-bold">
                Privacidade
              </span>
              <div className="bg-gray-50 p-3 rounded-md mt-1 text-sm text-gray-700">
                {repo.visibility === "public" ? "Público" : "Privado"}
              </div>
            </section>

            <section>
              <span className="text-[10px] text-gray-400 uppercase font-bold">
                Linguagem
              </span>
              <div className="bg-gray-50 p-3 rounded-md mt-1 text-sm text-gray-700">
                {repo.language || "Não informada"}
              </div>
            </section>

            <section>
              <span className="text-[10px] text-gray-400 uppercase font-bold">
                Descrição
              </span>
              <div className="bg-gray-50 p-4 rounded-md mt-1 text-sm text-gray-600 leading-relaxed">
                {repo.description || "Nenhuma descrição disponível."}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
