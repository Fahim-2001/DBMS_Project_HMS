import jsPDF from "jspdf";

export const generateLabReport = async (rep_id) => {
  // Report data fetching
  const labReport = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/labtests/${rep_id}}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  
  // PDF object creation
  const report = new jsPDF({
    orientation: "portrait",
  });

  // Heading
  report.setFont("bold");
  report.setFontSize(30);
  report.setTextColor(0, 150, 255);
  report.text("PHP Hospital", 110, 20, "center");
  report
    .setFont("normal")
    .setFontSize(18)
    .setTextColor("black")
    .text("Patient report", 110, 30, "center");
  report.line(10, 35, 200, 35); // horizontal line

  // ----------------  Row 1 --------------------
  // Id
  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Report Id :", 10, 40, "left")
    .setFont("times", "normal")
    .text(`${labReport?.id}`, 30, 40);

  // Fullname
  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Name : ", 52, 40, "left")
    .setFont("times", "normal")
    .text(`${labReport?.fullname}`, 65, 40);

  // Gender
  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Gender :", 100, 40, "left")
    .setFont("times", "normal")
    .text(`${labReport?.gender}`, 115, 40);

  // Email
  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Email :", 150, 40, "left")
    .setFont("times", "normal")
    .text(`${labReport?.email}`, 164, 40);

  // ----------------  Row 2 --------------------
  // Age
  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Age : ", 10, 45, "left")
    .setFont("times", "normal")
    .text(`${labReport?.age}`, 23, 45);

  // Contact
  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Contact : ", 52, 45, "left")
    .setFont("times", "normal")
    .text(`${labReport?.contact}`, 70, 45);

  // Test Fee
  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Test Fee :", 100, 45, "left")
    .setFont("times", "normal")
    .text(`${labReport?.payable_amount} BDT`, 115, 45);

  // Number Of Tests
  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Number of tests :", 150, 45, "left")
    .setFont("times", "normal")
    .text(`${labReport?.number_of_tests}`, 178, 45);

  report.line(10, 50, 200, 50); // horizontal line

  //-------------------- report Section -------------------


  report
    .setFont("times", "bold")
    .setFontSize(10)
    .setTextColor("black")
    .text("Tests :", 10, 57, "left")
    .text("Remarks:",100,57, "left");

  // Tests
  const tests = JSON.parse(labReport.report);
  console.log(tests)
  let lineGap1 =  57;
  let lineGap2 = 57;
  tests.map((test) => {
    report
      .setFont("times", "normal")
      .setFontSize(10)
      .setTextColor("black")
      .text(`${test.testName}`, 20, (lineGap1 += 7))
      .text(`${test.reportTexts}`,110,(lineGap2 += 7));
  });

  report.line(10, 265, 200, 265); // horizontal line
  //  ------------------ Data Collection Info -------------------
  // Collection Data
  report
    .setFont("times")
    .setFontSize(10)
    .setTextColor("black")
    .text("Created by : ", 10, 270, "left")
    .setFont("times", "normal")
    .text(`PHP HMS Software`, 30, 270);
  // Collection date
  report
    .setFont("times")
    .setFontSize(10)
    .setTextColor("black")
    .text("Collection Date : ", 90, 270, "left")
    .setFont("times", "normal")
    .text(
      `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
      115,
      270
    );
  // Collection time
  report
    .setFont("times")
    .setFontSize(10)
    .setTextColor("black")
    .text("Collection Time : ", 155, 270, "left")
    .setFont("times", "normal")
    .text(
      `${new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      185,
      270
    );

  // Thank you message
  report
    .setFont("bold")
    .setFontSize(12)
    .setTextColor("black")
    .text("Thank You For Choosing Us", 110, 280, "center");
  // END
  report.save(`${labReport?.fullname}_report.pdf`);
};
