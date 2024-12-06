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
import { useInView } from "react-intersection-observer";

export default function ResultPage() {
  const location = useLocation();
  const { getProfiles } = useProfileApi();
  const { getGroups } = useGroupApi();

  // Données initiales transmises depuis la recherche
  const initialProfiles: AvatarCardInterface[] = location.state?.profiles || [];
  const initialGroups: GroupCardInterface[] = location.state?.groups || [];
  const searchCriteria = location.state?.searchCriteria || {};
  const initialTotalPages = location.state?.totalPages || 1;

  // États pour les résultats et la pagination
  const [profiles, setProfiles] =
    useState<AvatarCardInterface[]>(initialProfiles);
  const [groups, setGroups] = useState<GroupCardInterface[]>(initialGroups);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

  // Fonction pour charger les résultats (profils ou groupes)
  const fetchResults = async (page: number) => {
    if (page > totalPages || loading) return; // Ne charge pas si la page dépasse les limites
    setLoading(true);

    try {
      if (profiles.length > 0) {
        // Requête pour les profils
        const response = await getProfiles({ ...searchCriteria, page });
        setProfiles((prev) => [...prev, ...response.users]);
        setTotalPages(response.totalPages);
      } else if (groups.length > 0) {
        // Requête pour les groupes
        const response = await getGroups({ ...searchCriteria, page });
        setGroups((prev) => [...prev, ...response.groups]);
        setTotalPages(response.totalPages);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Erreur lors de la récupération des résultats :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Charger la première page si nécessaire
    if (!initialProfiles.length && !initialGroups.length) {
      fetchResults(1);
    }
  }, []);

  useEffect(() => {
    // Charger les pages suivantes lorsque l'utilisateur arrive à la fin
    if (inView && currentPage < totalPages) {
      fetchResults(currentPage + 1);
    }
  }, [inView]);

  return (
    <>
      <Header pageTitle="Résultats de la recherche" backLink="/" />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        {profiles.length > 0 && (
          <section className="flex flex-col gap-3 lg:gap-6">
            <h2>Vos recommandations de voyageurs</h2>
            <div className="grid grid-cols-3 lg:grid-cols-4 justify-start gap-x-10 gap-y-3 lg:gap-y-6">
              {profiles.map((profile: AvatarCardInterface) => (
                <AvatarCard key={profile.user_id} profile={profile} />
              ))}
            </div>
          </section>
        )}

        {groups.length > 0 && (
          <section className="flex flex-col gap-3 lg:gap-6">
            <h2>Vos recommandations de groupes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full lg:gap-6">
              {groups.map((group: GroupCardInterface) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </section>
        )}

        {loading && <p>Chargement...</p>}

        {/* Observateur pour la pagination infinie */}
        <div ref={ref} className="h-1" />
      </main>
      <Footer />
    </>
  );
}
