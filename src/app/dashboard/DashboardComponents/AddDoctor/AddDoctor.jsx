"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { generate } from "generate-password";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { runningUser } = useContext(UserDataContext);
  const formRef = useRef();

  const onSubmit = async (doctor) => {
    try {
      setLoading(true);
      // // Digging out image file object from the form elements.
      const fileInput = doctor?.profile_picture[0];

      // // Processing the imageFile into FormData to send in cloudinary
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

      // Doctor generation
      doctor.profile_picture = data.secure_url;
      const password = generate({
        length: 8,
        numbers: true,
      });
      const routename = doctor?.speciality
        .split("")
        .filter((e) => e.trim().length)
        .join("")
        .toLowerCase();
      doctor["role"] = "doctor";
      doctor["password"] = password;
      doctor["routename"] = routename;

      // console.log(doctor);

      // POST Method : to doctors api
      const response = await fetch("http://localhost:3000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });

      // Generation as a normal user
      const user = {
        name: doctor?.firstname + " " + doctor.lastname,
        email: doctor?.email,
        password: doctor?.password,
        userRole: doctor?.role,
        gender: doctor?.gender,
        picture: doctor?.profile_picture,
      };
      console.log(user);

      // POST Method : to registers api
      const response2 = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      router.refresh();

      if (response.ok && response2.ok) {
        toast.success("Doctor registered!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        formRef.current.reset();
      } else {
        toast.warning("Doctor registration failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    (runningUser?.userRole === "super-admin" ||
      runningUser?.userRole === "admin") && (
      <div>
        <p className="text-xs font-semibold mb-2">Add Doctor</p>
        <form
          className="text-xs"
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap">
            <div className="my-1">
              <label className="mr-1">First Name</label>
              <br />
              <input
                required
                className="border border-primary mr-2 p-1 rounded"
                {...register("firstname")}
              />
            </div>
            <div className="my-1">
              <label className="mr-1">Last Name</label>
              <br />
              <input
                required
                className="border border-primary mr-2 p-1 rounded"
                {...register("lastname")}
              />
            </div>
            <div className="my-1">
              <label className="mr-1">Email Address</label>
              <br />
              <input
                required
                className="border border-primary mr-2 p-1 rounded"
                placeholder="Enter your valid gmail"
                {...register("email")}
              />
            </div>
            <div className="my-1">
              <label className="mr-1">Phone Number</label>
              <br />
              <input
                placeholder="+88016890*****"
                required
                className="border border-primary mr-2 p-1 rounded"
                type="tel"
                {...register("phone_number")}
              />
            </div>
            <div className="my-1">
              <label className="mr-1">Speciality</label>
              <br />
              <input
                required
                className="border border-primary mr-2 p-1 rounded"
                {...register("speciality")}
              />
            </div>
            <div className="my-1">
              <label className="mr-1">Gender </label>
              <br />
              <select
                className="border border-primary mr-2 p-1 rounded px-[4px]"
                {...register("gender")}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div className="my-1">
              <label className="mr-1">Profile Picture</label>
              <br />
              <input
                type="file"
                name="picture"
                className="file-input file-input-bordered file-input-xs file-input-primary w-full max-w-xs text-xs"
                {...register("profile_picture")}
              />
            </div>
            <div className="flex my-2 md:my-4 md:mx-3">
              <div className="my-1">
                <label className="mr-1">Available From : </label>

                <input
                  type="time"
                  required
                  className="border border-primary mr-2 p-1 rounded"
                  {...register("available_from")}
                />
              </div>
              <div className="my-1">
                <label className="mr-1">To : </label>

                <input
                  type="time"
                  required
                  className="border border-primary mr-2 p-1 rounded"
                  {...register("available_to")}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <button disabled className="flex justify-center items-centermx-1 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl">
              <span className="px-2">Adding Doctor</span>
              <span className="loading loading-spinner loading-xs"></span>
            </button>
          ) : (
            <button className="mx-1 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl">
              Add Doctor
            </button>
          )}
        </form>
        <hr className="my-3" />
      </div>
    )
  );
};

export default AddDoctor;
