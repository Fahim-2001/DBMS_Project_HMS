import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Doctor Appointment",
};
const DoctorsForAppointments = ({ props, doctor }) => {
  // console.log(props)
  // console.log(doctor)

  return (
    <div>
      <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg ">
        <div className="flex justify-center -mt-16 md:justify-end">
          {doctor?.picture ? (
            <img
              className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full "
              alt="Testimonial avatar"
              src={doctor?.picture}
            />
          ) : (
            <img
              className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full "
              src={
                doctor?.gender == "male"
                  ? "https://as1.ftcdn.net/v2/jpg/02/90/56/38/1000_F_290563830_MCl0UobSKqqgV7wE8KeSOsablqJIUNCg.jpg"
                  : "https://www.asirox.com/wp-content/uploads/2022/07/depositphotos_90647730-stock-illustration-female-doctor-avatar-icon.webp"
              }
            />
          )}
        </div>

        <h2 className="mt-2 text-xl font-semibold text-gray-800  md:mt-0">
          {doctor?.first_name}
        </h2>
        <div className="text-[10px] text-gray-500">
          <p>MBBS, Dhaka Medical College</p>
          <p>FCPS, London University of Medical Science</p>
        </div>

        <div className="mt-2 text-xs md:text-sm text-gray-600 ">
          <p>
            <span className="font-semibold">Sepciality :</span>{" "}
            {doctor?.speciality}
          </p>
          <p>
            <span className="font-semibold">Available:</span>{" "}
            {doctor?.available_from} - {doctor?.available_to}
          </p>
          <p>
            <span className="font-semibold">Appointment Fee:</span> 800 BDT
          </p>
          <hr className="my-2" />
          <p>
            {doctor?.first_name}, a seasoned medical professional with 9 years
            of experience, is at the forefront of patient care and medical
            expertise. Throughout their illustrious career, {doctor?.first_name}{" "}
            has consistently delivered exceptional healthcare and has earned the
            trust of countless patients.
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <Link
            href={`/department/${props?.slug}/${doctor?.doc_id}`}
            className="text-lg font-medium text-blue-600 "
            tabindex="0"
            role="link"
          >
            Book Appointment {"->"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorsForAppointments;
