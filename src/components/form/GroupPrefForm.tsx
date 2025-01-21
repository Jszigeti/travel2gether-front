// REACT HOOKS
import { useEffect, useState } from "react";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// ROUTER
import { NavLink, useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { useGroupApi } from "../../api/group";

// FORMIK + YUP
import { useFormik } from "formik";
import * as Yup from "yup";

// INTERFACES
import { GroupInterface } from "../../interfaces/Group";
import {
  TravelTypesSet,
  LodgingsSet,
  GroupGenderEnum,
  SpokenLanguagesSet,
  BudgetEnum,
  GroupAgeRangesSet,
} from "../../interfaces/Matching";

// FORM DATA
import {
  ageRangesOptions,
  budgetOptions,
  groupGenderOptions,
  lodgingsOptions,
  spokenLanguagesOptions,
  travelTypesOptions,
} from "../../data/formOptions";

// COMPONENTS
import Dropdown from "../UI/DropdownComponent";
import { Card, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

// PROPS INTERFACE
interface GroupPrefFormProps {
  groupCreationContext?: boolean;
  groupData?: GroupInterface;
  paramsId?: number;
}

export default function GroupPrefForm({
  groupCreationContext = true,
  groupData,
  paramsId,
}: GroupPrefFormProps) {
  // STATES
  const [error, setError] = useState<null | string>(null);
  const { editGroup, getGroup } = useGroupApi();
  // REDIRECTION
  const navigate = useNavigate();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE GROUP ID
  const groupId = groupData?.id || paramsId;

  // RETRIEVE GROUP DATA
  const {
    data: groupPref,
    isLoading: isGroupPrefLoading,
    isError: isGroupPrefError,
  } = useQuery<GroupInterface>({
    queryKey: ["groupPref", groupId],
    queryFn: () =>
      groupId
        ? getGroup(groupId)
        : Promise.reject(new Error("Group ID is required")),
    enabled: !groupCreationContext,
  });

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      travelTypes: [] as TravelTypesSet[],
      lodgings: [] as LodgingsSet[],
      gender: [] as GroupGenderEnum[],
      spokenLanguages: [] as SpokenLanguagesSet[],
      budget: [] as BudgetEnum[],
      ageRanges: [] as GroupAgeRangesSet[],
    },
    validationSchema: Yup.object({
      travelTypes: Yup.array(),
      lodgings: Yup.array(),
      gender: Yup.array(),
      spokenLanguages: Yup.array(),
      budget: Yup.array(),
      ageRanges: Yup.array(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      values.travelTypes?.forEach((travelType) =>
        formData.append("travelTypes[]", travelType)
      );
      values.budget?.forEach((budget) => formData.append("budget[]", budget));
      values.lodgings?.forEach((lodging) =>
        formData.append("lodgings[]", lodging)
      );
      values.spokenLanguages?.forEach((spokenLanguage) =>
        formData.append("spokenLanguages[]", spokenLanguage)
      );
      values.ageRanges?.forEach((ageRange) =>
        formData.append("ageRanges[]", ageRange)
      );
      values.gender?.forEach((gender) => formData.append("gender[]", gender));
      if (groupId) {
        try {
          setError(null);
          const response = await editGroup(groupId, formData);
          console.log("Mise à jour du groupe réussie", response);
          if (groupCreationContext) {
            navigate(`/group/${groupId}`);
            toast.success("Info du groupe mises à jour avec succès !");
          } else {
            navigate(`/group/${groupId}/edit`);
            queryClient.setQueryData(["groupPref", groupId], values);
            queryClient.invalidateQueries({
              queryKey: ["groupDetails", groupId],
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
      }
    },
  });

  useEffect(() => {
    if (groupPref) {
      formik.setValues({
        travelTypes: groupPref.travelTypes || [],
        lodgings: groupPref.lodgings || [],
        gender: Array.isArray(groupPref.gender)
          ? groupPref.gender.filter(Boolean)
          : groupPref.gender
          ? [groupPref.gender]
          : [],
        spokenLanguages: groupPref.spokenLanguages || [],
        budget: groupPref.budget || [],
        ageRanges: groupPref.ageRanges || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupPref]);

  return (
    <Card
      shadow={false}
      className="flex justify-center items-center text-black "
    >
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-2">
          <Typography variant="h6" className="mt-1 ">
            Type de voyage
          </Typography>
          <Dropdown
            label="un type de voyage"
            options={travelTypesOptions}
            field={formik.getFieldProps("travelTypes")}
            formik={formik}
          />
          {formik.touched.travelTypes && formik.errors.travelTypes ? (
            <Typography color="red">{formik.errors.travelTypes}</Typography>
          ) : null}

          <Typography variant="h6" className=" mt-4">
            Hébergement
          </Typography>
          <Dropdown
            label="un type d'hébergement"
            options={lodgingsOptions}
            field={formik.getFieldProps("lodgings")}
            formik={formik}
          />
          {formik.touched.lodgings && formik.errors.lodgings ? (
            <Typography color="red">{formik.errors.lodgings}</Typography>
          ) : null}

          <Typography variant="h6" className=" mt-4">
            Genre
          </Typography>
          <Dropdown
            multiple={false}
            label="un genre"
            options={groupGenderOptions}
            field={formik.getFieldProps("gender")}
            formik={formik}
          />
          {formik.touched.gender && formik.errors.gender ? (
            <Typography color="red">{formik.errors.gender}</Typography>
          ) : null}

          <Typography variant="h6" className=" mt-4">
            Langues parlées
          </Typography>
          <Dropdown
            label="une langue"
            options={spokenLanguagesOptions}
            field={formik.getFieldProps("spokenLanguages")}
            formik={formik}
          />
          {formik.touched.spokenLanguages && formik.errors.spokenLanguages ? (
            <Typography color="red">{formik.errors.spokenLanguages}</Typography>
          ) : null}

          <Typography variant="h6" className=" mt-4">
            Budget
          </Typography>
          <Dropdown
            label="un budget"
            multiple={false}
            options={budgetOptions}
            field={formik.getFieldProps("budget")}
            formik={formik}
          />
          {formik.touched.budget && formik.errors.budget ? (
            <Typography color="red">{formik.errors.budget}</Typography>
          ) : null}

          <Typography variant="h6" className=" mt-4">
            Tranche d'âge
          </Typography>
          <Dropdown
            label="une tranche d'âge"
            options={ageRangesOptions}
            field={formik.getFieldProps("ageRanges")}
            formik={formik}
          />
          {formik.touched.ageRanges && formik.errors.ageRanges ? (
            <Typography color="red">{formik.errors.ageRanges}</Typography>
          ) : null}
        </div>

        <Button
          className="font-montserrat font-bold mt-6 bg-blue text-white"
          fullWidth
          type="submit"
        >
          Valider
        </Button>
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la mise à jour du groupe
          </div>
        )}
        {isGroupPrefLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isGroupPrefError && (
          <div className="text-red-500 text-center">
            Erreur lors du chargement des données
          </div>
        )}
      </form>
      {groupCreationContext && (
        <NavLink className="text-blue" to={`/group/${groupId}`}>
          Compléter les préférences plus tard
        </NavLink>
      )}
    </Card>
  );
}
