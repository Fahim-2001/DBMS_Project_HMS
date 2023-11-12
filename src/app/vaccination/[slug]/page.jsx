import React from "react";
import { vaccineData } from "../vaccineData";
import styles from "./page.module.css";
import VaccineForm from "@/app/Components/VaccineForm/VaccineForm";

const page = ({ params }) => {
  const vaccine = vaccineData.find((vac) => {
    return params.slug === vac.routename;
  });
  // console.log(vaccine);
  return (
    <div className="m-3">
      <h1 className="text-primary text-2xl text-center font-semibold">
        {vaccine?.disease}
      </h1>
      <div className="flex justify-center my-3">
        <img src={vaccine?.image} alt="" className={styles.img} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col justify-center gap-4">
          <p>
            <span className="font-semibold">Name:</span> {vaccine?.vaccineName}
          </p>
          <p>
            <span className="font-semibold">Recommended Age:</span>{" "}
            {vaccine?.recommendedAge}
          </p>
          <p>
            <span className="font-semibold">Dosage:</span> {vaccine?.dosage}
          </p>

          <p>
            <span className="font-semibold">Frequency:</span>{" "}
            {vaccine?.frequency}
          </p>
          <p>
            <span className="font-semibold">Importance:</span>{" "}
            {vaccine?.importance}
          </p>
          <p>
            <span className="font-semibold">Campaing Time:</span>{" "}
            {vaccine?.campaign_time}
          </p>
        </div>
        <div>
          <p className="text-primary text-xl font-medium mx-auto">Get This Vaccine from us</p>
          <VaccineForm vaccine={vaccine}/>
        </div>
      </div>
    </div>
  );
};

export default page;
