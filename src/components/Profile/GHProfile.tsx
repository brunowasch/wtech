import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { LoadingProfile } from "../LoadingProfile";

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

export function GHProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const reposPerPage = 3;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos`),
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        if (userRes.status === 404 || userData.message === "Not Found") {
          navigate("/?error=user_not_found");
          return;
        }

        if (!Array.isArray(reposData)) {
          setError("Erro ao carregar repositórios.");
        } else {
          setUser(userData);
          setRepos(reposData);
        }
      } catch (err) {
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }
    if (username) fetchData();
  }, [username, navigate]);

  const totalRepos = repos.length;
  const totalPages = Math.ceil(totalRepos / reposPerPage);
  const currentPage =
    totalPages === 0 ? 0 : Math.floor(currentIndex / reposPerPage) + 1;

  const nextRepos = () => {
    if (currentIndex + reposPerPage < totalRepos) {
      setCurrentIndex(currentIndex + reposPerPage);
    }
  };

  const prevRepos = () => {
    if (currentIndex - reposPerPage >= 0) {
      setCurrentIndex(currentIndex - reposPerPage);
    }
  };

  const visibleRepos = repos.slice(currentIndex, currentIndex + reposPerPage);

  if (loading) return <LoadingProfile />;
  if (error)
    return (
      <div className="p-20 text-center text-red-500 font-bold">{error}</div>
    );

  return (
    <div className="min-h-screen bg-[#F1F1F1] pb-10">
      <Header />
      <main className="max-w-6xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Informações do Perfil
        </h2>

        {user && (
          <div className="flex items-center gap-6 p-6 border border-gray-100 rounded-2xl bg-white shadow-sm mb-12 max-w-2xl">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold block">
                Nome
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {user.name || user.login}
              </h3>
              <span className="text-[10px] text-gray-400 uppercase font-bold block">
                Bio
              </span>
              <p className="text-gray-600 text-sm">
                {user.bio || "Sem bio disponível."}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Repositórios</h2>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-medium">
              {currentPage} de {totalPages}
            </span>

            <div className="flex gap-2">
              <button
                onClick={prevRepos}
                disabled={currentIndex === 0}
                className="p-1 border border-gray-200 rounded disabled:opacity-30 hover:bg-gray-50 text-gray-500"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={nextRepos}
                disabled={currentIndex + reposPerPage >= totalRepos}
                className="p-1 border border-gray-200 rounded disabled:opacity-30 hover:bg-gray-50 text-gray-500"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleRepos.map((repo) => (
            <Link
              to={`/repository/${username}/${repo.name}`}
              key={repo.id}
              className="block group"
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm h-full bg-white group-hover:border-blue-400 transition-all">
                <div className="p-4 border-b border-blue-50">
                  <h4 className="font-bold text-[#05478A] truncate">
                    {repo.name}
                  </h4>
                </div>
                <div className="p-4 bg-gray-50 space-y-4">
                  <section>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Link
                    </span>
                    <div className="bg-white p-2 rounded border border-gray-100 text-xs text-gray-700 truncate mt-1">
                      {repo.html_url}
                    </div>
                  </section>
                  <section>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Descrição
                    </span>
                    <div className="bg-white p-2 rounded border border-gray-100 text-xs text-gray-600 line-clamp-2 mt-1 min-h-[48px]">
                      {repo.description || "Sem descrição."}
                    </div>
                  </section>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
