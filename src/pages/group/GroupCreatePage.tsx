import { GroupCreateForm } from "../../components/form/GroupCreateForm";
import GroupPreferenceForm from "../../components/form/GroupPreferenceForm";

export default function CreateGroup() {
  return (
    <div>
      <GroupCreateForm />
      <GroupPreferenceForm />
    </div>
  );
}
