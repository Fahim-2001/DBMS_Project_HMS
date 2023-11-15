"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DoctorsProfileEditorForm = ({ doctor }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const router = useRouter();
  // console.log(doctor);

  const handleProfileUpdate = async (updatedDoctor) => {
    try {
      setLoading(true);
      // Digging out image file object from the form elements.
      const fileInput = updatedDoctor?.profile_picture[0];

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

      //   profile_pictuer link
      updatedDoctor.profile_picture = data.secure_url;

      // console.log(updatedDoctor);

      const response = await fetch(
        `http://localhost:3000/api/doctors/${doctor?.doc_id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedDoctor),
        }
      );

      if (updatedDoctor.profile_picture) {
        const response2 = await fetch(
          `http://localhost:3000/api/users/${doctor?.user_id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedDoctor.profile_picture),
          }
        );
        if (response2.ok) {
          console.log("Success");
        }
      }
      router.refresh();

      if (response.ok) {
        toast.success("Successfully Updated", {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        toast.warning("Update Failed", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-xs">
      <div className="font-semibold">
        <p>Doctor's Profile</p>
      </div>
      <form action="" onSubmit={handleSubmit(handleProfileUpdate)}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">First Name</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={doctor?.first_name}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Last Name</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={doctor?.last_name}
              readOnly
            />
          </div>
        </div>
        {/* Row 2 */}
        <p className="font-semibold mt-3">Contact Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Phone Number</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={doctor?.phone_number}
              {...register("phone_number")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Update Profile Picture</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full file-input-info"
              {...register("profile_picture")}
            />
          </div>
        </div>
        <div className="flex justify-end my-3">
          {loading ? (
            <button
              disabled
              className="flex justify-center items-center mx-1 my-2 bg-primary hover:bg-secondary text-white font-semibold px-[10px] py-[4px] rounded-xl"
            >
              <span>Update</span>
              <span className="loading loading-spinner loading-xs px-2 "></span>
            </button>
          ) : (
            <button
              type="submit"
              className="mx-1 my-2 bg-primary hover:bg-secondary text-white font-semibold px-[10px] py-[4px] rounded-xl"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DoctorsProfileEditorForm;
