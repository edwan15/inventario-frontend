import { useEffect, useState } from "react";

import React from "react";
import useRedirectLoggedOutUser from "../../custom/useRedirect";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/Services";
import { SET_NAME, SET_USER } from "../../features/auth/authSlice/authSlice";
import Loader from "../../Util/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);
      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="flex justify-center   min-h-50vh ">
      {isLoading && <Loader />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <div className="justify-center  items-start grid ">
            <div className="rounded-3xl  self-end overflow-hidden shadow-xl max-w-xs my-3 bg-blue-500">
              <img src={"https://i.imgur.com/dYcYQ7E.png"} alt="profile" className="w-full" />
              <div className="flex justify-center -mt-8">
                <img
                  src={profile?.photo}
                  alt="profil"
                  className="rounded-full border-solid  w-40 border-white border-2 -mt-3"
                />
              </div>
              <div className="text-center px-3 pb-6 pt-2">
                <h3 className="text-white text-sm bold font-sans">
                  {profile?.name}
                </h3>
                <p className="mt-2 font-sans font-light text-white">
                  {profile?.bio}
                </p>
              </div>
              <div className="flex justify-center pb-3 text-white">
                <div className="text-center mr-3 border-r pr-3">
                  <h2>{profile?.phone}</h2>
                  <span>Telefono</span>
                </div>
                <div className="text-center">
                  <h2>{profile?.email}</h2>
                  <span>Email</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">

              <Link to={"/edit-profile"}>
            <button className="px-1 p-2 bg-red-400 rounded-lg text-white">Editar Perfil</button>
              </Link>

            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Profile;
