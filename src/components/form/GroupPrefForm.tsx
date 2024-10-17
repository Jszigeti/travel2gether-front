// REACT HOOKS
import { useEffect, useState } from "react";

// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// ROUTER
import { NavLink, useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { editGroup, getGroup } from "../../api/group";

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

  // REDIRECTION
  const navigate = useNavigate();

  // RETRIEVE GROUP ID
  const groupId = groupData?.id || paramsId;

  // RETRIEVE GROUP PREF DATA
  const {
    data: groupPrefData,
    isLoading: isGroupPrefLoading,
    isError: isGroupPrefError,
  } = useQuery<GroupInterface>({
    queryKey: ["groupPref", groupId],
    queryFn: () => (groupId ? getGroup(groupId) : Promise.resolve({})),
    enabled: !groupCreationContext,
    // enabled: false,
  });

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      travel_types: [] as TravelTypesSet[],
      lodgings: [] as LodgingsSet[],
      gender_type: [] as GroupGenderEnum[],
      spoken_languages: [] as SpokenLanguagesSet[],
      budget: [] as BudgetEnum[],
      age_ranges: [] as GroupAgeRangesSet[],
    },
    validationSchema: Yup.object({
      travel_types: Yup.array(),
      lodgings: Yup.array(),
      gender_type: Yup.array(),
      spoken_languages: Yup.array(),
      budget: Yup.array(),
      age_ranges: Yup.array(),
    }),
    onSubmit: async (values) => {
      if (groupId) {
        try {
          setError(null);
          const response = await editGroup(groupId, values);
          console.log("Mise à jour du groupe réussie", response);
          if (groupCreationContext) {
            navigate(`/group/${groupId}`);
          } else {
            navigate(`/group/${groupId}/edit`);
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
    if (groupPrefData) {
      formik.setValues({
        travel_types: groupPrefData.travel_types || [],
        lodgings: groupPrefData.lodgings || [],
        gender_type: groupPrefData.gender_type || [],
        spoken_languages: groupPrefData.spoken_languages || [],
        budget: groupPrefData.budget || [],
        age_ranges: groupPrefData.age_ranges || [],
      });
    }
  }, [groupPrefData]);

  return (
    <Card
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black "
    >
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-2">
          <Typography variant="h6" className="mt-1 ">
            Type de voyage
          </Typography>
          <Dropdown
            label="un type de voyage"
            options={travelTypesOptions}
            field={formik.getFieldProps("travel_types")}
            formik={formik}
          />
          {formik.touched.travel_types && formik.errors.travel_types ? (
            <Typography color="red">{formik.errors.travel_types}</Typography>
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
            field={formik.getFieldProps("gender_type")}
            formik={formik}
          />
          {formik.touched.gender_type && formik.errors.gender_type ? (
            <Typography color="red">{formik.errors.gender_type}</Typography>
          ) : null}

          <Typography variant="h6" className=" mt-4">
            Langues parlées
          </Typography>
          <Dropdown
            label="une langue"
            options={spokenLanguagesOptions}
            field={formik.getFieldProps("spoken_languages")}
            formik={formik}
          />
          {formik.touched.spoken_languages && formik.errors.spoken_languages ? (
            <Typography color="red">
              {formik.errors.spoken_languages}
            </Typography>
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
            field={formik.getFieldProps("age_ranges")}
            formik={formik}
          />
          {formik.touched.age_ranges && formik.errors.age_ranges ? (
            <Typography color="red">{formik.errors.age_ranges}</Typography>
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
