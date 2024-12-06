import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AvatarCard from "../../components/UI/AvatarCard";
import GroupCard from "../../components/UI/GroupCard";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { AvatarCardInterface } from "../../interfaces/Profile";
import { GroupCardInterface } from "../../interfaces/Group";
import { useProfileApi } from "../../api/profile";
import { useGroupApi } from "../../api/group";

export default function ResultPage() {
  const location = useLocation();
  const { getProfiles } = useProfileApi();
  const { getGroups } = useGroupApi();

  // Données transmises depuis le formulaire
  const initialProfiles = location.state?.profiles || [];
  const initialGroups = location.state?.groups || [];
  const searchCriteria = location.state?.searchCriteria || {};

  // États
  const [profiles, setProfiles] =
    useState<AvatarCardInterface[]>(initialProfiles);
  const [groups, setGroups] = useState<GroupCardInterface[]>(initialGroups);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Charger les résultats
  const fetchResults = async (page: number) => {
    setLoading(true);
    try {
      if (profiles.length > 0) {
        const response = await getProfiles({ ...searchCriteria, page });
        setProfiles(response.users);
        setTotalPages(response.totalPages);
      } else if (groups.length > 0) {
        const response = await getGroups({ ...searchCriteria, page });
        setGroups(response.groups);
        setTotalPages(response.totalPages);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Erreur lors de la récupération des résultats :", error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les résultats initiaux
  useEffect(() => {
    if (!initialProfiles.length && !initialGroups.length) {
      fetchResults(1);
    }
  }, []);

  return (
    <>
      <Header pageTitle="Résultats de la recherche" backLink="/" />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        {loading ? (
          <p>Chargement...</p>
        ) : profiles.length > 0 ? (
          <section className="flex flex-col gap-3 lg:gap-6">
            <h2>Vos recommandations de voyageurs</h2>
            <div className="grid grid-cols-3 lg:grid-cols-4 justify-start gap-x-10 gap-y-3 lg:gap-y-6">
              {profiles.map((profile: AvatarCardInterface) => (
                <AvatarCard profile={profile} key={profile.user_id} />
              ))}
            </div>
          </section>
        ) : groups.length > 0 ? (
          <section className="flex flex-col gap-3 lg:gap-6">
            <h2>Vos recommandations de groupes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full lg:gap-6">
              {groups.map((group: GroupCardInterface) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </section>
        ) : (
          <p>Aucun résultat trouvé</p>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            onClick={() => fetchResults(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Précédent
          </button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            onClick={() => fetchResults(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Suivant
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
