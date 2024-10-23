import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import SearchGroupsForm from "../form/SearchGroupsForm";
import SearchUsersForm from "../form/SearchUsersForm";

export default function SearchMenu() {
  const data = [
    {
      label: "Groupes",
      value: "groups",
      icon: UserGroupIcon,
      desc: <SearchGroupsForm />,
    },
    {
      label: "Utilisateurs",
      value: "users",
      icon: UserCircleIcon,
      desc: <SearchUsersForm />,
    },
  ];
  return (
    <Tabs value="groups">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
