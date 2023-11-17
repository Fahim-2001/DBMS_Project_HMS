import jsPDF from "jspdf";

export const generateAppointmentInvoice = (patient) => {
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
    .text("Appointment Invoice", 110, 30, "center");
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
    .text(":", 25, 85)
    .setFont("", "normal")
    .text(`${patient?.patient_issue}`, 30, 85);

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
    .text(`${patient?.appt_type}`, 145, 69);
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
    .text(`${patient?.appt_time}`, 145, 85);

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
    .text(`${patient?.appt_fee} BDT`, 60, 115);

  // Payment Status
  if (patient?.paid == false) {
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
  } else {
    doc
      .setFont("times", "bold")
      .setFontSize(16)
      .setTextColor("black")
      .text("Payment Status ", 10, 123, "left")
      .text(":", 55, 123)
      .setFont("", "normal")
      .text("PAID", 60, 123);

    doc.addImage(
      "https://o.remove.bg/downloads/04a90aee-7f1d-4b1c-999c-c8e6d02eb803/paid-grunge-rubber-stamp-vector-35946478-removebg-preview.png",
      "PNG",
      75,
      120,
      70,
      70
    );
  }

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

  //  ------------------ Data Collection Info -------------------
  // Collection Data
  doc
    .setFont("times")
    .setFontSize(10)
    .setTextColor("black")
    .text("Created by : ", 10, 270, "left")
    .setFont("", "normal")
    .text(`PHP HMS Software`, 30, 270);
  // Collection date
  doc
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
  doc
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
  doc
    .setFont("bold")
    .setFontSize(12)
    .setTextColor("black")
    .text("Thank You For Choosing Us", 110, 280, "center");
  // END
  doc.save(`${patient?.patient_name}_appt_invoice.pdf`);
};
