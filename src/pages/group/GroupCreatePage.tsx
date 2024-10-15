// REACT HOOKS
import { useState } from "react";

// COMPONENTS
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import GroupInfoForm from "../../components/form/GroupInfoForm";
import GroupPrefForm from "../../components/form/GroupPrefForm";
import { GroupInterface } from "../../interfaces/Group";

export default function GroupCreatePage() {
  // STATES
  const [view, setView] = useState(0);
  const [groupData, setGroupData] = useState<GroupInterface>();

  // STATES FUNCTIONS
  function handleNext() {
    if (view < 1) setView((v) => v + 1);
  }

  function handleGroupData(values: GroupInterface) {
    setGroupData(values);
  }
  return (
    <>
      <Header pageTitle="Création du groupe" backLink="/" />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        {view === 0 ? (
          <GroupInfoForm onNext={handleNext} onGroupData={handleGroupData} />
        ) : (
          <GroupPrefForm groupData={groupData} />
        )}
      </main>
      <Footer />
    </>
  );
}
