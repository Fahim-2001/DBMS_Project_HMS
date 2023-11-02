"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const GeneralProfileEditor = ({ singleUser }) => {
  const { register, handleSubmit } = useForm();

  const handleUpdate = async(updatedProfile) => {
    try {
      // Digging out image file object from the form elements.
      const fileInput = updatedProfile?.picture[0];

      // Processing the imageFile into FormData to send in cloudinary
      const formData = new FormData();
      formData.set("file", fileInput);

      // Form data set to cloudinary unsigned preset to prevent unsigned error into regarding preset 'phphospital-user-uploads'
      formData.append("upload_preset", "phphospital-user-uploads");

      // POST method : formdata to the cloudinary
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dqvsc6e7e/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());

      updatedProfile.picture = data.secure_url;

      // PUT method for updating user profile.
      const response = await fetch(`http://localhost:3000/api/users/${singleUser?.id}`,{
        method:'PUT',
        body: JSON.stringify(updatedProfile),
      })

      if(response.ok){
        toast.success("Profile Updated",{position:'top-right', autoClose:1000});
      }else{
        toast.warning("Profile Update Failed",{position:'top-right', autoClose:1000});
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="text-xs">
      <p className="font-semibold">User's Profile</p>
      <form action="" onSubmit={handleSubmit(handleUpdate)}>
        {/* Row 1 */}

        <div className="form-control w-full mt-2">
          <label className="label">
            <span className="font-medium">First Name</span>
          </label>
          <input
            className="input input-bordered input-sm w-full text-sm"
            defaultValue={singleUser?.fullname}
          />
        </div>

        {/* Row 2 */}
        <p className="font-semibold mt-3">Contact Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Phone Number</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={singleUser?.phone_number}
              {...register("phone_number")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Address</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={singleUser?.address}
              {...register("address")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Email</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={singleUser?.email}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Update Profile Picture</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full file-input-info"
              {...register("picture")}
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end my-3">
          <button
            type="submit"
            className="mx-1 my-2 bg-primary hover:bg-secondary text-white font-semibold px-[10px] py-[4px] rounded-xl"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralProfileEditor;
