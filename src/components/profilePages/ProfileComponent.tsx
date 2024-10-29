// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// ROUTER
import { NavLink } from "react-router-dom";

// AXIOS FUNCTIONS
import { getProfile } from "../../api/profile";

// INTERFACES
import { ProfilePageInterface } from "../../interfaces/Profile";

// UTILS FUNCTIONS
import { formatDate } from "../../utils/formatDate";
import { displayAge } from "../../utils/displayAge";

// COMPONENTS
import GroupCard from "../UI/GroupCard";
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
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery<ProfilePageInterface>({
    queryKey: ["profile", userId],
    queryFn: () =>
      userId
        ? getProfile(userId)
        : Promise.reject(new Error("User ID is required")),
  });

  if (!profile)
    return (
      <div className="text-red-500 text-center">
        Erreur lors du chargement des données
      </div>
    );

  return (
    <>
      <section className="flex md:gap-12 lg:gap-20 xl:gap-24 justify-center gap-6 shadow-md p-4 rounded-md ">
        {isProfileLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isProfileError && (
          <div className="text-red-500 text-center">
            Erreur lors du chargement des données
          </div>
        )}
        <Avatar
          src={profile.path_picture}
          alt={`${profile.firstname} (photo de profil)`}
          size="xxl"
        />
        <section className="flex flex-col justify-between font-bold ">
          <h2 className="font-bold">
            {`${profile.firstname}
          ${profile.lastname?.charAt(0)}.`}
          </h2>
          <section className="flex flex-col sm:flex-row sm:gap-2">
            <Rating value={Math.round(profile.average_rating)} readonly />
            {profile.average_rating} ({profile.ratings} avis)
          </section>
          <section className="flex gap-2">
            <Chip value={profile.gender} className="bg-green w-fit " />
            <Chip
              value={displayAge(profile.birthdate)}
              className="bg-green w-fit "
            />
          </section>
        </section>
        {myProfileContext ? (
          <NavLink to={`/my-profile/edit`}>
            <FontAwesomeIcon icon={faCog} color="#68baf5" size="2xl" />
          </NavLink>
        ) : (
          <NavLink to={`/my-profile/messages/${profile.user_id}`}>
            <FontAwesomeIcon icon={faEnvelope} color="#68baf5" size="2xl" />
          </NavLink>
        )}
      </section>
      <section className="flex flex-col md:grid md:grid-cols-2 gap-6">
        <section className="flex flex-col justify-between shadow-md p-4 rounded-md">
          <div>{profile.description}</div>
          <p className="font-bold">
            Disponible du {formatDate(profile.available_from)} au{" "}
            {formatDate(profile.available_to)}
          </p>
        </section>
        {(profile.spoken_languages.length <= 1 ||
          profile.interests.length <= 1 ||
          profile.trip_durations.length <= 1 ||
          profile.lodgings.length <= 1) && (
          <section className=" flex flex-col gap-3 shadow-md p-4 rounded-md">
            <h2 className="font-bold">Informations</h2>

            {profile.spoken_languages.length > 0 && (
              <div>
                <h3>Langues parlées</h3>
                <section className="flex flex-wrap gap-3">
                  {profile.spoken_languages.map((lang, index) => (
                    <Chip value={lang} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profile.interests.length > 0 && (
              <div>
                <h3>Centres d'intérêt</h3>
                <section className="flex gap-3 flex-wrap">
                  {profile.interests.map((intr, index) => (
                    <Chip value={intr} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profile.trip_durations.length > 0 && (
              <div>
                <h3>Durées préférées</h3>
                <section className="flex gap-3 flex-wrap">
                  {profile.trip_durations.map((dur, index) => (
                    <Chip value={dur} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profile.lodgings.length > 0 && (
              <div>
                <h3>Préférences d'hébergement</h3>
                <section className="flex gap-3 flex-wrap">
                  {profile.lodgings.map((lodge, index) => (
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
          {profile.groups.map((gr, index) => (
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
