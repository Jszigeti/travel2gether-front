// REACT HOOKS
import { useEffect, useState } from "react";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// AXIOS FUNCTIONS
import { useChecklistApi } from "../../api/checklist";
import { useGroupApi } from "../../api/group";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string } from "yup";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";
import { ChecklistInterface } from "../../interfaces/Checklist";

// UTILS FUNCTIONS
import { retrieveUserRole } from "../../utils/retrieveUserRole&Status";

// COMPONENTS
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";

// PROPS INTERFACE
interface ChecklistProps {
  groupId: number;
  stageId?: number;
  stageCheckList?: boolean;
}

export default function Checklist({
  groupId,
  stageId,
  stageCheckList = false,
}: ChecklistProps) {
  // STATES
  const [addItem, setAddItem] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [userRole, setUserRole] = useState<
    "NOT_MEMBER" | "TRAVELER" | "ORGANIZER" | "AUTHOR"
  >("NOT_MEMBER");
  const {
    getGroupChecklist,
    createGroupChecklistItem,
    createStageChecklistItem,
    getStageChecklist,
    deleteChecklistItem,
  } = useChecklistApi();
  const { getGroup } = useGroupApi();

  // RETRIEVE USER FROM CONTEXT
  const { user } = useAuthContext();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE GROUP DATA
  const {
    data: groupDetails,
    isLoading: isGroupDetailsLoading,
    isError: isGroupDetailsError,
  } = useQuery<GroupPageInterface>({
    queryKey: ["groupDetails", groupId],
    queryFn: () =>
      groupId
        ? getGroup(groupId)
        : Promise.reject(new Error("Group ID is required")),
  });

  // RETRIEVE GROUP CHECKLIST ITEMS
  const {
    data: groupChecklistItems,
    isLoading: isGroupChecklistItemsLoading,
    isError: isGroupChecklistItemsError,
  } = useQuery<ChecklistInterface[]>({
    queryKey: ["groupChecklist", groupId],
    queryFn: () =>
      groupId
        ? getGroupChecklist(groupId)
        : Promise.reject(new Error("Group ID is required")),
    enabled: !stageCheckList,
  });

  // RETRIEVE STAGE CHECKLIST ITEMS
  const {
    data: stageCheckListItems,
    isLoading: isStageCheckListItemsLoading,
    isError: isStageCheckListItemsError,
  } = useQuery<ChecklistInterface[]>({
    queryKey: ["stageChecklist", groupId],
    queryFn: () =>
      groupId && stageId
        ? getStageChecklist(groupId, stageId)
        : Promise.reject(new Error("Group ID and stage ID are required")),
    enabled: stageCheckList,
  });

  // DETERMINES CHECKLISTITEMS BASED ON THE CONTEXT
  let checklistItems;
  if (stageCheckList) {
    checklistItems = stageCheckListItems;
  } else {
    checklistItems = groupChecklistItems;
  }

  // RETRIEVE USER ROLE
  useEffect(() => {
    if (groupDetails && user) {
      retrieveUserRole(groupDetails, user.id, setUserRole);
    }
  }, [user, groupDetails]);

  // STATES FUNCTIONS
  const handleViewForm = () => {
    setAddItem((s) => !s);
  };

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      item: "",
    },
    validationSchema: object({
      item: string().required("Champ requis"),
    }),
    onSubmit: async (values) => {
      try {
        setError(null);
        let response;
        if (stageCheckList && stageId) {
          response = await createStageChecklistItem(groupId, stageId, values);
          console.log(
            "Ajout de l'item dans la checklist d'étape réussi",
            response
          );
          queryClient.invalidateQueries({
            queryKey: ["stageChecklist", groupId],
          });
        } else {
          response = await createGroupChecklistItem(groupId, values);
          console.log(
            "Ajout de l'item dans la checklist de groupe réussi",
            response
          );
          queryClient.invalidateQueries({
            queryKey: ["groupChecklist", groupId],
          });
        }
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue est survenue");
        }
        console.log(error);
      }
    },
  });

  // DELETE ITEM FUNCTION
  const handleDeleteItem = async (itemId: number) => {
    try {
      const response = await deleteChecklistItem(itemId);
      console.log(
        "Suppression de l'item dans la checklist de groupe réussie",
        response
      );
      queryClient.invalidateQueries({
        queryKey: ["groupChecklist", groupId],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
      console.log(error);
    }
  };

  if (
    !checklistItems ||
    isGroupDetailsError ||
    isGroupChecklistItemsError ||
    isStageCheckListItemsError
  )
    return (
      <div className="text-red-500 text-center">
        Erreur lors du chargement des données
      </div>
    );

  return (
    <>
      {(isGroupDetailsLoading ||
        isGroupChecklistItemsLoading ||
        isStageCheckListItemsLoading) && (
        <div className="text-blue text-center">Chargement des données...</div>
      )}
      <Card className="w-full lg:w-3/4 mx-auto">
        <List>
          {checklistItems.map((item) => (
            <ListItem
              ripple={false}
              className="py-1 pr-1 pl-4 cursor-default"
              key={item.id}
            >
              {item.item}
              {(userRole === "AUTHOR" || userRole === "ORGANIZER") && (
                <ListItemSuffix>
                  <FontAwesomeIcon
                    onClick={() => handleDeleteItem(Number(item.id))}
                    className="cursor-pointer"
                    icon={faX}
                  />
                </ListItemSuffix>
              )}
            </ListItem>
          ))}
          {addItem && (
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex justify-center items-center gap-3 w-full">
                <div className="relative w-2/3 lg:w-4/5">
                  <input
                    type="text"
                    name="item"
                    value={formik.values.item}
                    onChange={formik.handleChange}
                    className={`!border-blue border rounded-md w-full focus:outline-none px-2 relative ${
                      formik.touched.item && formik.errors.item
                        ? "!border-red-500"
                        : null
                    }`}
                  />
                  {formik.touched.item && formik.errors.item ? (
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="absolute right-2 top-[5px] text-red-500"
                    />
                  ) : null}
                </div>

                <Button
                  type="submit"
                  className="bg-blue h-7 leading-[0.3rem] w-1/3 lg:w-1/5"
                >
                  Ajouter
                </Button>
              </div>

              {formik.errors.item && formik.touched.item && (
                <div className="mt-1 text-red-500">{formik.errors.item}</div>
              )}
              {error && (
                <div className="text-red-500 text-center">
                  Une erreur est survenue
                </div>
              )}
            </form>
          )}
        </List>
      </Card>
      {(userRole === "AUTHOR" || userRole === "ORGANIZER") && (
        <div>
          <FontAwesomeIcon
            icon={faPlus}
            className="h-10 w-10 bg-blue text-white rounded-full p-4 md:hidden cursor-pointer shadow-lg hover:shadow-2xl"
            onClick={handleViewForm}
          />
          <Button
            className="w-48 bg-blue hidden md:block"
            onClick={handleViewForm}
          >
            Ajouter un item
          </Button>
        </div>
      )}
    </>
  );
}
