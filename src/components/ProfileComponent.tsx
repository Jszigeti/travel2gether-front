import { Chip, Avatar, Rating, Button } from "@material-tailwind/react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { profileDetails } from "../data/profileDetails";
import { formatDate } from "../utils/formatDate";
import { displayAge } from "../utils/displayAge";
import GroupCard from "./UI/GroupCard";

export default function ProfileComponent() {
  return (
    <>
      <section className="flex md:gap-12 lg:gap-20 xl:gap-24 justify-center gap-6 shadow-md p-4 rounded-md ">
        <Avatar
          src={profileDetails.path_picture}
          alt={`${profileDetails.firstname} (photo de profil)`}
          size="xxl"
        />
        <section className="flex flex-col justify-between font-bold ">
          <h2 className="font-bold">
            {`${profileDetails.firstname}
          ${profileDetails.lastname.charAt(0)}.`}
          </h2>
          <section className="flex flex-col sm:flex-row sm:gap-2">
            <Rating
              value={Math.round(profileDetails.average_rating)}
              readonly
            />
            {profileDetails.average_rating} ({profileDetails.ratings} avis)
          </section>
          <section className="flex gap-2">
            <Chip value={profileDetails.gender} className="bg-green w-fit " />
            <Chip
              value={displayAge(profileDetails.birthdate)}
              className="bg-green w-fit "
            />
          </section>
        </section>
        <NavLink to={`/my-profile/messages/${profileDetails.user_id}`}>
          <FontAwesomeIcon icon={faEnvelope} color="#68baf5" size="2xl" />
        </NavLink>
      </section>
      <section className="flex flex-col md:grid md:grid-cols-2 gap-6">
        <section className="flex flex-col justify-between shadow-md p-4 rounded-md">
          <div>{profileDetails.description}</div>
          <p className="font-bold">
            Disponible du {formatDate(profileDetails.available_from)} au{" "}
            {formatDate(profileDetails.available_to)}
          </p>
        </section>
        {(profileDetails.spoken_languages.length <= 1 ||
          profileDetails.interests.length <= 1 ||
          profileDetails.trip_durations.length <= 1 ||
          profileDetails.lodgings.length <= 1) && (
          <section className=" flex flex-col gap-3 shadow-md p-4 rounded-md">
            <h2 className="font-bold">Informations</h2>

            {profileDetails.spoken_languages.length > 0 && (
              <div>
                <h3>Langues parlées</h3>
                <section className="flex flex-wrap gap-3">
                  {profileDetails.spoken_languages.map((lang, index) => (
                    <Chip value={lang} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profileDetails.interests.length > 0 && (
              <div>
                <h3>Centres d'intérêt</h3>
                <section className="flex gap-3 flex-wrap">
                  {profileDetails.interests.map((intr, index) => (
                    <Chip value={intr} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profileDetails.trip_durations.length > 0 && (
              <div>
                <h3>Durées préférées</h3>
                <section className="flex gap-3 flex-wrap">
                  {profileDetails.trip_durations.map((dur, index) => (
                    <Chip value={dur} key={index} className="bg-green w-fit" />
                  ))}
                </section>
              </div>
            )}

            {profileDetails.lodgings.length > 0 && (
              <div>
                <h3>Préférences d'hébergement</h3>
                <section className="flex gap-3 flex-wrap">
                  {profileDetails.lodgings.map((lodge, index) => (
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
          {profileDetails.groups.map((gr, index) => (
            <GroupCard group={gr} key={index} />
          ))}
        </div>
      </section>
      <section className="flex justify-center gap-3 md:gap-6 lg:gap-12">
        <NavLink to={"/a"}>
          <Button className="bg-red-500 sm:w-40">Signaler</Button>
        </NavLink>
        <NavLink to={"/a"}>
          <Button className="bg-red-500 sm:w-40">Bloquer</Button>
        </NavLink>
      </section>
    </>
  );
}
