import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectUser } from "../../features/auth/authSlice/authSlice";
import { updateUser } from "../../services/Services";

const EditProfile = () => {
  const navigate = useNavigate();
  const [ setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [ setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Handle Image upload
      // let imageURL;
      // if (
      //   profileImage &&
      //   (profileImage.type === "image/jpeg" ||
      //     profileImage.type === "image/jpg" ||
      //     profileImage.type === "image/png")
      // )
      
        // const image = new FormData();
        // image.append("file", profileImage);
        // image.append("cloud_name", "ddoeotuge");
        // image.append("upload_preset", "198183466753287");

        // // First save image to cloudinary
        // const response = await fetch(
        //   `https://api.cloudinary.com/v1_1/ddoeotuge/image/upload`,
        //   {
        //     method: "post",
        //     body: image,

        //   }
        // );
        // const imgData = await response.json();
        // imageURL = imgData.url;

        // Save Profile

        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          // photo: profileImage ? imageURL : profile.photo,
        };

        const data = await updateUser(formData);
        console.log(data);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="  grid  justify-center ">
      <div className="rounded-3xl  self-end overflow-hidden shadow-xl w-[300px] md:w-[500px] my-3 bg-blue-500">
        <img src={"https://i.imgur.com/dYcYQ7E.png"} alt="edit-profile" className="w-full" />
        <div className="flex justify-center -mt-8">
          <img
            src={user?.photo} alt="editar-profile"
            className="rounded-full border-solid  w-40 border-white border-2 -mt-3"
          />
        </div>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p className="mt-5 mb-3">
              <label className="text-white font-extrabold">Name : </label>
              <input
                className="rounded-md"
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label className="text-white font-extrabold">Email : </label>
              <input
                type="text"
                name="email"
                value={profile?.email}
                className="rounded-md mb-2"
                disabled
              />
              <br />
              <code>Email No puede Cambiarse</code>
            </p>
            <p>
              <label className="text-white font-extrabold"> Phone : </label>
              <input
                className="rounded-md mb-5"
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label className="text-white font-extrabold"> Bio : </label>
              <textarea
                className="rounded-md"
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="20"
                rows="5"
              ></textarea>
            </p>
            <p className="mt-4 ">
              <label className="text-white font-extrabold "> Photo : </label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="px-1 p-2 rounded-xl bg-red-400 text-white font-extrabold mb-5 mt-5">
                Edit Profile
              </button>
            </div>
          </span>
        </form>
      </div>
    </div>

    // <div cardClass={"card --flex-dir-column"}>
    //   <span className="profile-photo">
    //     <img src={user?.photo} alt="profilepic" />
    //   </span>
    //   <form className="--form-control --m" onSubmit={saveProfile}>
    //     <span className="profile-data">
    //       <p>
    //         <label>Name:</label>
    //         <input
    //           type="text"
    //           name="name"
    //           value={profile?.name}
    //           onChange={handleInputChange}
    //         />
    //       </p>
    //       <p>
    //         <label>Email:</label>
    //         <input type="text" name="email" value={profile?.email} disabled />
    //         <br />
    //         <code>Email cannot be changed.</code>
    //       </p>
    //       <p>
    //         <label>Phone:</label>
    //         <input
    //           type="text"
    //           name="phone"
    //           value={profile?.phone}
    //           onChange={handleInputChange}
    //         />
    //       </p>
    //       <p>
    //         <label>Bio:</label>
    //         <textarea
    //           name="bio"
    //           value={profile?.bio}
    //           onChange={handleInputChange}
    //           cols="30"
    //           rows="10"
    //         ></textarea>
    //       </p>
    //       <p>
    //         <label>Photo:</label>
    //         <input type="file" name="image" onChange={handleImageChange} />
    //       </p>
    //       <div>
    //         <button className="--btn --btn-primary">Edit Profile</button>
    //       </div>
    //     </span>
    //   </form>
    // </div>
  );
};

export default EditProfile;
