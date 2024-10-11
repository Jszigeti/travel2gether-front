// FAKE DATA
import { groupsList } from "../../data/groupsList";
import { profilesList } from "../../data/profilesList";

// COMPONENTS
import Header from "../../components/UI/Header";
import GroupCard from "../../components/UI/GroupCard";
import AvatarCard from "../../components/UI/AvatarCard";
import Footer from "../../components/UI/Footer";

export default function HomePage() {
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
            {groupsList.slice(0, 4).map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-3 lg:gap-6">
          <h2>Vos recommandations de voyageurs</h2>
          <div className="grid grid-cols-3 lg:grid-cols-4 justify-start gap-x-10 gap-y-3 lg:gap-y-6">
            {profilesList.slice(0, 9).map((profile) => (
              <AvatarCard profile={profile} key={profile.user_id} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
