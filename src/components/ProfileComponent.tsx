// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// ROUTER
import { NavLink } from "react-router-dom";

// AXIOS FUNCTIONS
import { getProfile } from "../api/profile";

// INTERFACES
import { ProfilePageInterface } from "../interfaces/Profile";

// UTILS FUNCTIONS
import { formatDate } from "../utils/formatDate";
import { displayAge } from "../utils/displayAge";

// COMPONENTS
import GroupCard from "./UI/GroupCard";
import { Chip, Avatar, Rating, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEnvelope } from "@fortawesome/free-solid-svg-icons";

// PROPS INTERFACE
interface ProfileComponentProps {
  myProfileContext?: boolean;
  userId: number;
}

export default function ProfileComponent({
  myProfileContext = false,
  userId,
}: ProfileComponentProps) {
  // RETRIEVE PROFIL INFO DATA
  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    isError: isProfileDataError,
  } = useQuery<ProfilePageInterface>({
    queryKey: ["profileData", userId],
    queryFn: () =>
      userId
        ? getProfile(userId)
        : Promise.reject(new Error("User ID is required")),
  });

  if (!profileData)
    return (
      <div className="text-red-500 text-center">
        Erreur lors du chargement des données
      </div>
    );

  return (
    <>
      <section className="flex md:gap-12 lg:gap-20 xl:gap-24 justify-center gap-6 shadow-md p-4 rounded-md ">
        {isProfileDataLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isProfileDataError && (
          <div className="text-red-500 text-center">
            Erreur lors du chargement des données
          </div>
        )}
        <Avatar
          src={profileData.path_picture}
          alt={`${profileData.firstname} (photo de profil)`}
          size="xxl"
        />
        <section className="flex flex-col justify-between font-bold ">
          <h2 className="font-bold">
            {`${profileData.firstname}
          ${profileData.lastname?.charAt(0)}.`}
          </h2>
          <section className="flex flex-col sm:flex-row sm:gap-2">
            <Rating value={Math.round(profileData.average_rating)} readonly />
            {profileData.average_rating} ({profileData.ratings} avis)
          </section>
          <section className="flex gap-2">
            <Chip value={profileData.gender} className="bg-green w-fit " />
            <Chip
              value={displayAge(profileData.birthdate)}
              className="bg-green w-fit "
            />
          </section>
        </section>
        {myProfileContext ? (
          <NavLink to={`/my-profile/edit`}>
            <FontAwesomeIcon icon={faCog} color="#68baf5" size="2xl" />
          </NavLink>
        ) : (
          <NavLink to={`/my-profile/messages/${profileData.user_id}`}>
            <FontAwesomeIcon icon={faEnvelope} color="#68baf5" size="2xl" />
          </NavLink>
        )}
      </section>
      <section className="flex flex-col md:grid md:grid-cols-2 gap-6">
        <section className="flex flex-col justify-between shadow-md p-4 rounded-md">
          <div>{profileData.description}</div>
          <p className="font-bold">
            Disponible du {formatDate(profileData.available_from)} au{" "}
            {formatDate(profileData.available_to)}
          </p>
        </section>
        {(profileData.spoken_languages.length <= 1 ||
          profileData.interests.length <= 1 ||
          profileData.trip_durations.length <= 1 ||
          profileData.lodgings.length <= 1) && (
          <section className=" flex flex-col gap-3 shadow-md p-4 rounded-md">
            <h2 className="font-bold">Informations</h2>

            {profileData.spoken_languages.length > 0 && (
              <div>
                <h3>Langues parlées</h3>
                <section className="flex flex-wrap gap-3">
                  {profileData.spoken_languages.map((lang, index) => (
                    <Chip value={lang} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profileData.interests.length > 0 && (
              <div>
                <h3>Centres d'intérêt</h3>
                <section className="flex gap-3 flex-wrap">
                  {profileData.interests.map((intr, index) => (
                    <Chip value={intr} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profileData.trip_durations.length > 0 && (
              <div>
                <h3>Durées préférées</h3>
                <section className="flex gap-3 flex-wrap">
                  {profileData.trip_durations.map((dur, index) => (
                    <Chip value={dur} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profileData.lodgings.length > 0 && (
              <div>
                <h3>Préférences d'hébergement</h3>
                <section className="flex gap-3 flex-wrap">
                  {profileData.lodgings.map((lodge, index) => (
                    <Chip
                      value={lodge}
                      key={index}
                      className="bg-green w-fit"
                    />
                  ))}
                </section>
              </div>
            )}
          </section>
        )}
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="font-bold">Voyages à venir</h2>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {profileData.groups.map((gr, index) => (
            <GroupCard group={gr} key={index} />
          ))}
        </div>
      </section>
      {!myProfileContext && (
        <section className="flex justify-center gap-3 md:gap-6 lg:gap-12">
          <NavLink to={"/a"}>
            <Button className="bg-red-500 sm:w-40">Signaler</Button>
          </NavLink>
          <NavLink to={"/a"}>
            <Button className="bg-red-500 sm:w-40">Bloquer</Button>
          </NavLink>
        </section>
      )}
    </>
  );
}
