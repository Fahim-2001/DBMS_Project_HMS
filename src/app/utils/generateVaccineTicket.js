import jsPDF from "jspdf";

export const generateVaccineTicket = (data) => {
  // PDF object creation
  const prescription = new jsPDF({
    orientation: "portrait",
  });

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

  prescription.save("vaccine ticket.pdf");
};
