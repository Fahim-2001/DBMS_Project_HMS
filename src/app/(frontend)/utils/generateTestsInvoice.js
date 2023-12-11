import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateTestsInvoice = async (unique_id) => {
  const testInfo = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/labtests/${unique_id}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  const testInvoice = new jsPDF({
    orientation: "landscape",
  });

  // Heading

  // Column 1 - Name
  testInvoice.setFont("bold");
  testInvoice.setFontSize(30);
  testInvoice.setTextColor(0, 150, 255);
  testInvoice.text("PHP Hospital", 10, 20, "left");
  testInvoice
    .setFont("normal")
    .setFontSize(18)
    .setTextColor("black")
    .text("Test Invoice", 10, 30, "left");

  // Column 2 - Address
  const addressLineGap = 15;
  testInvoice
    .setFontSize(12)
    .text("Contact : +8801325678923", 290, addressLineGap + 5, "right")
    .text("E-mail: hospital@php.health.bd", 290, addressLineGap + 10, "right")
    .text(
      "Location : Nayanagar, Baridhara J-Block, Gulshan, Dhaka.",
      290,
      addressLineGap + 15,
      "right"
    );

  testInvoice.line(0, 40, 300, 40); // horizontal line

  // --------------- ROW 1 ----------------------
  const row1Yaxis = 50;
  // Token
  testInvoice
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Token :", 10, row1Yaxis, "left")
    .setFont("times", "normal")
    .text(`${testInfo?.unique_id}`, 28, row1Yaxis, "left");

  // Number Of Tests
  testInvoice
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Number Of Tests :", 80, row1Yaxis, "left")
    .setFont("times", "normal")
    .text(`${testInfo?.number_of_tests}`, 120, row1Yaxis, "left");

  // Registration Date
  testInvoice
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Registration Date :", 155, row1Yaxis, "left")
    .setFont("times", "normal")
    .text(
      `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
      200,
      row1Yaxis,
      "left"
    );

  // --------------- ROW 2 ----------------------
  const row2Yaxis = 60;
  // Name
  testInvoice
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Name :", 10, row2Yaxis, "left")
    .setFont("times", "normal")
    .text(`${testInfo.fullname}`, 28, row2Yaxis, "left");

  // Gender
  testInvoice
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Gender :", 80, row2Yaxis, "left")
    .setFont("times", "normal")
    .text(`${testInfo.gender}`, 100, row2Yaxis, "left");

  // Age
  testInvoice
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Age :", 155, row2Yaxis, "left")
    .setFont("times", "normal")
    .text(`${testInfo.age}`, 170, row2Yaxis, "left");

  // Contact
  testInvoice
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Contact :", 230, row2Yaxis, "left")
    .setFont("times", "normal")
    .text(`${testInfo.contact}`, 250, row2Yaxis, "left");

  testInvoice.line(0, 70, 300, 70); // horizontal line
  // --------------- ROW 3 ----------------------
  testInvoice
    .setFont("times", "bold")
    .setFontSize(14)
    .text("Tests Information :", 10, 80, "left");

  // Test Informations in Table
  const tests = JSON.parse(testInfo?.tests || "times");
  console.log(tests);
  const tableKeys = [["Test Id", "Test Name", "Price"]];

  let totalCost = 0;
  // Adding Tests Keys into Table
  tests?.map((test) => {
    tableKeys.push([test?.id, test?.test, test?.price + " BDT"]);
    totalCost += test?.price;
  });

  tableKeys.push(["", "Total Amount", totalCost + " BDT"]);
  tableKeys.push(["", "Paid Amount", testInfo?.advanced_amount + " BDT"]);

  if (testInfo?.due_amount) {
    tableKeys.push(["", "Due Amount", testInfo?.due_amount + " BDT"]);
    // Due Seal
    testInvoice.addImage(
      "https://res.cloudinary.com/dqvsc6e7e/image/upload/v1700330437/phphospital-user-uploads/payment-due-text-red-grungy-round-rubber-stamp-vintage-219540081-removebg-preview_q1pbcl.png",
      "PNG",
      245,
      150,
      40,
      40
    );
  } else {
    testInvoice.addImage(
      "https://res.cloudinary.com/dqvsc6e7e/image/upload/v1700311752/phphospital-user-uploads/paid-grunge-rubber-stamp-vector-35946478-removebg-preview_jl1nda.png",
      "PNG",
      245,
      150,
      40,
      40
    );
  }

  // Add a table with cell padding using jsPDF-AutoTable
  testInvoice.autoTable({
    head: [tableKeys[0]], // Header row
    body: tableKeys.slice(1), // Data rows
    margin: { top: 85 },
  });

  // -------------------------- ROW 3 ----------------------------
  // Collection Data
  testInvoice
    .setFont("times")
    .setFontSize(10)
    .setTextColor("black")
    .text("Created by : ", 10, 200, "left")
    .setFont("times", "normal")
    .text(`PHP HMS Software`, 30, 200);

  // Collection date
  testInvoice
    .setFont("times", "bold")
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
  testInvoice
    .setFont("times", "bold")
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

  testInvoice.save(`${testInfo.fullname} Test Invoice.pdf`);
};
