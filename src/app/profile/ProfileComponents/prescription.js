import jsPDF from "jspdf";

export const generatePrescription = async (appt_id) => {
  // Appointment data fetching
  const appointment = await fetch(
    `http://localhost:3000/api/appointments/${appt_id}}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  const appt = appointment[0];

  console.log(appt);
  // PDF object creation
  const prescription = new jsPDF({
    orientation: "portrait",
  });

  // appt_date: "2023-11-12"
  // ​​
  // appt_fee: 800
  // ​​
  // appt_id: 5
  // ​​
  // appt_status: "Checked"
  // ​​
  // appt_type: "new"
  // ​​
  // department: "Emergency Medicine"
  // ​​
  // doc_email: "kader.doct@gmail.com"
  // ​​
  // doc_id: 2
  // ​​
  // patient_address: "Rupganj"
  // ​​
  // patient_age: "30"
  // ​​
  // patient_contact: "01234567891"
  // ​​
  // patient_gender: "male"
  // ​​
  // patient_issue: "Pasay Betha"
  // ​​
  // patient_name: "Arbin Zaman"
  // ​​
  // prescription: "Napa (3time daily after meal), Sergel (3times daily before meal)"
  // ​​
  // ref_doctor: "Dr. Abdul "
  // ​​
  // ref_email: "fahim@gmail.com"
  // ​​
  // test_preferences: "X-ray"

  // Heading
  prescription.setFont("bold");
  prescription.setFontSize(30);
  prescription.setTextColor(0, 150, 255);
  prescription.text("PHP Hospital", 110, 20, "center");
  prescription
    .setFont("normal")
    .setFontSize(18)
    .setTextColor("black")
    .text("Patient Prescription", 110, 30, "center");
  prescription.line(10, 35, 200, 35); // horizontal line

  // ----------------  Row 1 --------------------
  // Name
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Patient Name ", 10, 40, "left")
    .text(":", 32, 40)
    .setFont("", "normal")
    .text(`${appt?.patient_name}`, 34, 40);

  // Age
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Patient Age ", 72, 40, "left")
    .text(":", 90, 40)
    .setFont("", "normal")
    .text(`${appt?.patient_age} y/o`, 92, 40);

  // Gender
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Patient Gender ", 105, 40, "left")
    .text(":", 129, 40)
    .setFont("", "normal")
    .text(`${appt?.patient_gender}`, 132, 40);

  // Contact Number
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Phone Number ", 145, 40, "left")
    .text(":", 169, 40)
    .setFont("", "normal")
    .text(`${appt?.patient_contact}`, 172, 40);

  // ----------------  Row 2 --------------------
  // Address
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Patient Address ", 10, 45, "left")
    .text(":", 35, 45)
    .setFont("", "normal")
    .text(`${appt?.patient_address}`, 37, 45);

  // Issue
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Patient Issue ", 72, 45, "left")
    .text(":", 92, 45)
    .setFont("", "normal")
    .text(`${appt?.patient_issue}`, 94, 45);

  // Appt Fee
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Appointment Fee ", 145, 45, "left")
    .text(":", 173, 45)
    .setFont("", "normal")
    .text(`${appt?.appt_fee} BDT`, 175, 45);

  // ----------------  Row 3 --------------------
  // Appt id
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Appointment Id ", 10, 50, "left")
    .text(":", 35, 50)
    .setFont("", "normal")
    .text(`${appt?.appt_id}`, 40, 50);

  // Appt Type
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Appointment Type ", 72, 50, "left")
    .text(":", 102, 50)
    .setFont("", "normal")
    .text(`${appt?.appt_type} y/o`, 105, 50);

  // Appt Date
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Appointment Date ", 145, 50, "left")
    .text(":", 173, 50)
    .setFont("", "normal")
    .text(`${appt?.appt_date}`, 175, 50);
  prescription.line(10, 55, 200, 55); // horizontal line

  //-------------------- Prescription Section -------------------
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Medicines to take :", 10, 67, "left");

  // Medicines
  const medicines = appt.prescription.split(", ");
  let lineGapMed = 67;
  medicines.map((med) => {
    prescription
      .setFont("times", "normal")
      .setFontSize(10)
      .setTextColor("black")
      .text(`${med}`, 20, (lineGapMed += 7));
  });

  //-------------------- Test Preferences -----------------------
  prescription
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Test Preferences :", 110, 67, "left");

  // Tests
  const tests = appt.test_preferences.split(", ");
  let lineGapTest = 67;
  tests.map((test) => {
    prescription
      .setFont("times", "normal")
      .setFontSize(10)
      .setTextColor("black")
      .text(`${test}`, 130, (lineGapTest += 7));
  });

  // ------------------- Doctor's Information -------------------
  prescription
    .setFont("times","bold")
    .setFontSize(10)
    .setTextColor("indigo")
    .text(`${appt?.ref_doctor}`, 165, 230, "center")
    .text(`MBBS, Dhaka Medical College`, 165, 235, "center")
    .text(`FCPS, School of Medical Science, London`, 165, 240, "center")
    .text(`${appt?.department}`, 165, 245, "center")
    .text(`PHP Hospital`, 165, 250, "center");

  prescription.line(10, 265, 200, 265); // horizontal line
  //  ------------------ Data Collection Info -------------------
  // Collection Data
  prescription
    .setFont("times")
    .setFontSize(10)
    .setTextColor("black")
    .text("Created by : ", 10, 270, "left")
    .setFont("", "normal")
    .text(`PHP HMS Software`, 30, 270);
  // Collection date
  prescription
    .setFont("times")
    .setFontSize(10)
    .setTextColor("black")
    .text("Collection Date : ", 90, 270, "left")
    .setFont("", "normal")
    .text(
      `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      115,
      270
    );
  // Collection time
  prescription
    .setFont("times")
    .setFontSize(10)
    .setTextColor("black")
    .text("Collection Time : ", 155, 270, "left")
    .setFont("", "normal")
    .text(
      `${new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      185,
      270
    );

  // Thank you message
  prescription
    .setFont("bold")
    .setFontSize(12)
    .setTextColor("black")
    .text("Thank You For Choosing Us", 110, 280, "center");
  // END
  prescription.save(`${appt?.patient_name}_prescription.pdf`);
};
