"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { jsPDF } from "jspdf";

const AppointmentForm = ({ doctor }) => {
  const { register, handleSubmit } = useForm();

  // console.log(doctor);

  const onSubmit = (patient) => {
    patient["doc_id"] = doctor?.doc_id;
    patient["fee"] = 800;
    console.log(patient);

    const doc = new jsPDF({
      orientation: "portrait",
    });

    // Heading
    doc.setFont("bold");
    doc.setFontSize(40);
    doc.setTextColor(0, 150, 255);
    doc.text("PHP Hospital", 110, 20, "center");
    doc
      .setFont("normal")
      .setFontSize(18)
      .setTextColor("black")
      .text("Appointment Confirmation Reciept", 110, 30, "center");
    doc.line(10, 35, 200, 35); // horizontal line

    // Left Column
    // Name
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Patient Name ", 10, 45, "left")
      .text(":", 55, 45)
      .setFont("", "normal")
      .text(`${patient?.patient_name}`, 60, 45);
    // Age
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Patient Age ", 10, 53, "left")
      .text(":", 55, 53)
      .setFont("", "normal")
      .text(`${patient?.patient_age}`, 60, 53);
    // Gender
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Patient Gender ", 10, 61, "left")
      .text(":", 55, 61)
      .setFont("", "normal")
      .text(`${patient?.patient_gender}`, 60, 61);
    // Address
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Address ", 10, 69, "left")
      .text(":", 55, 69)
      .setFont("", "normal")
      .text(`${patient?.patient_address}`, 60, 69);
    //Contact
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Contact ", 10, 77, "left")
      .text(":", 55, 77)
      .setFont("", "normal")
      .text(`${patient?.patient_contact}`, 60, 77);
    // Cause
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Issue ", 10, 85, "left")
      .text(":", 55, 85)
      .setFont("", "normal")
      .text(`${patient?.short_description}`, 60, 85);

    // Right Column
    // Doctor ID
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Doctor Id", 110, 45, "left")
      .text(":", 140, 45)
      .setFont("", "normal")
      .text(`${patient?.doc_id}`, 145, 45);
    // Ref Doctor
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Ref Doctor ", 110, 53, "left")
      .text(":", 140, 53)
      .setFont("", "normal")
      .text(`${patient?.ref_doctor}`, 145, 53);
    // Department
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Department ", 110, 61, "left")
      .text(":", 140, 61)
      .setFont("", "normal")
      .text(`${patient?.department}`, 145, 61);
    // Appointment Type
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Appt. Type ", 110, 69, "left")
      .text(":", 140, 69)
      .setFont("", "normal")
      .text(`${patient?.appointment_type}`, 145, 69);
    // Date
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Appt. Date ", 110, 77, "left")
      .text(":", 140, 77)
      .setFont("", "normal")
      .text(`${patient?.appt_date}`, 145, 77);
    // Availability
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Appt. Time ", 110, 85, "left")
      .text(":", 140, 85)
      .setFont("", "normal")
      .text(`${doctor?.available_from} - ${doctor?.available_to}`, 145, 85);

    doc.line(10, 90, 200, 90); // horizontal line
    // Payment Information
    doc
      .setFont("normal")
      .setFontSize(18)
      .setTextColor("black")
      .text("Payment Information", 110, 100, "center");
    doc.line(10, 105, 200, 105); // horizontal line

    // Right Column
    // Fee
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Payable Fee ", 10, 115, "left")
      .text(":", 55, 115)
      .setFont("", "normal")
      .text(`${patient?.fee} BDT`, 60, 115);

    // Payment Status
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Payment Status ", 10, 123, "left")
      .text(":", 55, 123)
      .setFont("", "normal")
      .text("DUE", 60, 123);
    // Payment Instructions
    doc
      .setFont("times")
      .setFontSize(14)
      .setTextColor("black")
      .text(
        `N.B: Confirm payment status as "PAID" by paying the bill before appointment.`,
        10,
        131,
        "left"
      )
      .text(
        `Appointment will be cancelled if you do not confirm payment with cashier's signature and seal.`,
        10,
        139,
        "left"
      );

    doc.line(85, 185, 135, 185); // horizontal line
    // Payment Confirmation Sign And Seal line
    doc
      .setFont("normal")
      .setFontSize(14)
      .setTextColor("black")
      .text("Cashier's Signature", 110, 193, "center");

    doc.line(10, 205, 200, 205); // horizontal line
    // General Instructions
    doc
      .setFont("times")
      .setFontSize(14)
      .setTextColor("black")
      .text(`General Instructions`, 10, 215, "left")
      .text(
        `1. Please bring either soft copy or hardcopy of this paper.`,
        10,
        223,
        "left"
      )
      .text(
        `2. Please don't delete this paper without completion of your appointment.`,
        10,
        231,
        "left"
      )
      .text(
        `3. Please don't break your serial number which will be given by doctor's assistant.`,
        10,
        239,
        "left"
      );
    // Thank you message
    doc
      .setFont("bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Thank You For Choosing Us", 110, 250, "center");

    // Collection Data
    doc
      .setFont("times")
      .setFontSize(10)
      .setTextColor("black")
      .text("Collector", 10, 260, "left")
      .text(":", 55, 260)
      .setFont("", "normal")
      .text(`Md. Asif Akbar`, 60, 260);
    // Collection date
    doc
      .setFont("times")
      .setFontSize(10)
      .setTextColor("black")
      .text("Collection Date", 10, 265, "left")
      .text(":", 55, 265)
      .setFont("", "normal")
      .text(
        `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        60,
        265
      );
    // Collection time
    doc
      .setFont("times")
      .setFontSize(10)
      .setTextColor("black")
      .text("Collection Time", 10, 270, "left")
      .text(":", 55, 270)
      .setFont("", "normal")
      .text(
        `${new Date().toLocaleString([],{
          hour:'2-digit',
          minute:'2-digit'
        })}`,
        60,
        270
      );
    // END
    doc.save(`${patient?.patient_name}_invoice.pdf`);
  };
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 capitalize">
        Appointment Form
      </h2>

      <form className="text-xs" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700" htmlFor="fullname">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_name")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_age")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="gender">
              Gender{" "}
            </label>
            <br />
            <select
              id="gender"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="contact">
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_contact")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_address")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="department">
              Department
            </label>
            <input
              id="department"
              type="text"
              required
              readOnly
              defaultValue={doctor?.speciality}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("department")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="ref_doctor">
              Reference Doctor
            </label>
            <input
              id="ref_doctor"
              type="text"
              required
              readOnly
              defaultValue={doctor?.first_name}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("ref_doctor")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="appointment_type">
              Appointment Type
            </label>
            <select
              id="appointment_type"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("appointment_type")}
            >
              <option value="new">New Appointment</option>
              <option value="revisit">Revisit</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="short_description">
              Describe your problem shortly
            </label>
            <textarea
              id="short_description"
              type="text"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("short_description")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="appt_date">
              Choose Date For Appointment
            </label>
            <input
              id="appt_date"
              type="date"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("appt_date")}
            />
            <p className="text-[10px] text-gray-500 ml-1">
              * Except government holiday
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
          >
            Confirm Appointment
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppointmentForm;
