import { useLocation } from "react-router-dom";
import AvatarCard from "../../components/UI/AvatarCard";
import GroupCard from "../../components/UI/GroupCard";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { AvatarCardInterface } from "../../interfaces/Profile";
import { GroupCardInterface } from "../../interfaces/Group";

export default function ResultPage() {
  const location = useLocation();

  const profiles = location.state?.profiles || [];
  const groups = location.state?.groups || [];

  return (
    <>
      <Header pageTitle="Résultats de la recherche" backLink="/" />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        {profiles.length > 0 ? (
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
          <p>Aucun résultat</p>
        )}
      </main>
      <Footer />
    </>
  );
}
