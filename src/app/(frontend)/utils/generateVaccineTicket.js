import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

export const generateVaccineTicket = (data) => {
  // PDF object creation
  const ticket = new jsPDF({
    orientation: "landscape",
  });

  // Heading

  // Column 1 - Name
  ticket.setFont("bold");
  ticket.setFontSize(30);
  ticket.setTextColor(0, 150, 255);
  ticket.text("PHP Hospital", 10, 20, "left");
  ticket
    .setFont("normal")
    .setFontSize(18)
    .setTextColor("black")
    .text("Vaccine Ticket", 10, 30, "left");

  // Column 2 - Address
  const addressLineGap = 15;
  ticket
    .setFontSize(12)
    .text("Contact : +8801325678923", 290, addressLineGap + 5, "right")
    .text("E-mail: hospital@php.health.bd", 290, addressLineGap + 10, "right")
    .text(
      "Location : Nayanagar, Baridhara J-Block, Gulshan, Dhaka.",
      290,
      addressLineGap + 15,
      "right"
    );

  ticket.line(0, 40, 300, 40); // horizontal line

  //Vaccine Takers Info
  // --------------- ROW 1 ----------------------
  const row1Yaxis = 50;
  // Token
  ticket
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Token :", 10, row1Yaxis, "left")
    .setFont("times", "normal")
    .text(`${data.token}`, 28, row1Yaxis, "left");

  // Vaccine Name
  ticket
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Vaccine :", 80, row1Yaxis, "left")
    .setFont("times", "normal")
    .text(`${data.vaccine_name}`, 100, row1Yaxis, "left");

  // Registration Date
  ticket
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Registration Date :", 155, row1Yaxis, "left")
    .setFont("times", "normal")
    .text(`${data.reg_date}`, 195, row1Yaxis, "left");

  // Number Of Doses
  const doses = 2;
  ticket
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Number of Doses :", 230, row1Yaxis, "left")
    .setFont("times", "normal")
    .text(`${doses}`, 270, row1Yaxis, "left");

  // --------------- ROW 2 ----------------------
  const row2Yaxis = 60;
  // Name
  ticket
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Name :", 10, row2Yaxis, "left")
    .setFont("times", "normal")
    .text(`${data.fullname}`, 28, row2Yaxis, "left");

  // Gender
  ticket
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Gender :", 80, row2Yaxis, "left")
    .setFont("times", "normal")
    .text(`${data.gender}`, 100, row2Yaxis, "left");

  // Age
  ticket
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Age :", 155, row2Yaxis, "left")
    .setFont("times", "normal")
    .text(`${data.age}`, 170, row2Yaxis, "left");

  // Contact
  ticket
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Contact :", 230, row2Yaxis, "left")
    .setFont("times", "normal")
    .text(`${data.contact}`, 250, row2Yaxis, "left");

  // --------------- ROW 2 ----------------------
  ticket
  .setFont("times", "bold")
  .setFontSize(14)
  .text("Vaccine Information :", 10, 90, "left");
  
  const dosesInfo = [
    ['Dose No', 'Date', 'Signature'],
    ['1', '', ''],
    ['2', '', ''],
  ];

  // Add a table with cell padding using jsPDF-AutoTable
ticket.autoTable( {
  head: [dosesInfo[0]], // Header row
  body: dosesInfo.slice(1), // Data rows
  margin: { top: 100 },
});

// --------------- ROW 3 -----------------------
// Collection Data
ticket
.setFont("times")
.setFontSize(10)
.setTextColor("black")
.text("Created by : ", 10, 200, "left")
.setFont("times", "normal")
.text(`PHP HMS Software`, 30, 200);

// Collection date
ticket
.setFont("times",'bold')
.setFontSize(10)
.setTextColor("black")
.text("Collection Date : ", 140, 200, "center")
.setFont("times", "normal")
.text(
  `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
  155,
  200
);

// Collection time
ticket
.setFont("times","bold")
.setFontSize(10)
.setTextColor("black")
.text("Collection Time : ", 273, 200, "right")
.setFont("times", "normal")
.text(
  `${new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`,
  275,
  200
);


  ticket.save("vaccine ticket.pdf");
};
