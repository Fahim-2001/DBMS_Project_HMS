import React from "react";
import { data } from "./catData";
import styles from './Catalogue.module.css'
import Link from "next/link";

export default function Catalogue() {
  // console.log(data);
  return (
    <div>
      <h1 className="text-center text-3xl lg:text-4xl text-primary font-bold px-2 py-3 my-2 drop-shadow-md">Book Your Appointment</h1>
      <div className="mx-[10%] my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-center">
        {data.map((dept) => (
          <Link href={`/department/${dept?.routename}`}key={dept.id} className="flex flex-col items-center my-5 mx-3 p-2 bg-base-100 shadow-md rounded-md transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer">
            <img src={dept.icon} className={styles.img}></img>
            <h1 className="text-sm">{dept.department}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
