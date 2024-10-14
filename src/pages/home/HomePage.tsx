// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// AXIOS FUNCTIONS
import { getGroups } from "../../api/group";
import { getProfiles } from "../../api/profile";

// INTERFACES
import { GroupCardInterface } from "../../interfaces/Group";
import { AvatarCardInterface } from "../../interfaces/Profile";

// COMPONENTS
import Header from "../../components/UI/Header";
import GroupCard from "../../components/UI/GroupCard";
import AvatarCard from "../../components/UI/AvatarCard";
import Footer from "../../components/UI/Footer";

export default function HomePage() {
  // RETRIEVE GROUPS DATA
  const {
    data: groupsList,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useQuery<GroupCardInterface[]>({
    queryKey: ["groups"],
    queryFn: () => getGroups(),
  });

  // RETRIEVE PROFILES DATA
  const {
    data: profilesList,
    isLoading: isProfilesLoading,
    isError: isProfilesError,
  } = useQuery<AvatarCardInterface[]>({
    queryKey: ["profiles"],
    queryFn: () => getProfiles(),
  });

  return (
    <>
      <Header />
      <img
        src="https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="xl:max-w-screen-xl xl:mx-auto"
      />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <section className="flex flex-col gap-3 lg:gap-6">
          <h2>Vos recommandations de groupes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full lg:gap-6">
            {isGroupsLoading && <div>Chargement des données</div>}
            {isGroupsError && <div>Erreur lors du chargement des données</div>}
            {groupsList &&
              groupsList
                .slice(0, 4)
                .map((group: GroupCardInterface) => (
                  <GroupCard key={group.id} group={group} />
                ))}
          </div>
        </section>
        <section className="flex flex-col gap-3 lg:gap-6">
          <h2>Vos recommandations de voyageurs</h2>
          <div className="grid grid-cols-3 lg:grid-cols-4 justify-start gap-x-10 gap-y-3 lg:gap-y-6">
            {isProfilesLoading && <div>Chargement des données</div>}
            {isProfilesError && (
              <div>Erreur lors du chargement des données</div>
            )}
            {profilesList &&
              profilesList
                .slice(0, 9)
                .map((profile: AvatarCardInterface) => (
                  <AvatarCard profile={profile} key={profile.user_id} />
                ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
