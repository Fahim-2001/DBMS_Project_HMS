import React from "react";
import styles from "./vaccination.module.css";
import { vaccineData } from "./vaccineData";
import Link from "next/link";


const Vaccination = () => {
  return (
    <div>
      <div className="m-2">
        <img
          src="https://media.cnn.com/api/v1/images/stellar/prod/210122135027-01-vaccine-in-arm-los-angeles-jan2020.jpg?q=w_3000,h_1688,x_0,y_0,c_fill"
          alt=""
          className={styles.img}
        />
        <div>
        <p className="text-primary text-3xl font-bold mb-3 drop-shadow-md">
          Importance of Vaccination
        </p>

        <p className="text-justify mr-5">
          Vaccination is one of the most critical advancements in modern
          medicine, playing a pivotal role in safeguarding public health,
          preventing diseases, and saving countless lives worldwide. It is a
          process by which a person is administered a vaccine, typically
          containing weakened or inactivated microorganisms or their components,
          to stimulate the immune system. The immune response produced prepares
          the body to defend itself against specific diseases, should the
          individual be exposed to the pathogen in the future. In this essay, we
          will delve into the multifaceted significance of vaccination,
          discussing its impact on individual health, public health, and society
          as a whole. <br />
        </p>
        </div>
        <div>
          <p className="text-primary text-3xl font-bold mb-3 text-right my-10 drop-shadow-md mr-3">Our Vaccine Programs</p>
          <div className="my-3 flex flex-wrap justify-center">
            {vaccineData.map(vac=>(
              <Link href={`vaccination/${vac?.routename}`} key={vac?.id} vac={vac} className="border border-primary rounded-md hover:bg-primary hover:text-white text-lg font-semibold shadow-md mx-2 my-2 px-4 py-3 ">{vac?.disease}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vaccination;
