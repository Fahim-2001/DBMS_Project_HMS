// This file contains all the sql queries according to particular API names.

export const sqlQueries = {
  users: {
    getAll: "SELECT * FROM users",
    getById: "SELECT * FROM users WHERE id=?",
    getByEmail: "SELECT * FROM users WHERE email = ?",
    postNew:
      "INSERT INTO users(fullname,email,password,userRole,gender,picture) VALUES(?,?,?,?,?,?)",
    updateRoleById: "UPDATE users SET userRole=? WHERE id=?",
    updatePasswordById: "UPDATE users SET password=? WHERE id=?",
    updatePhoneNumberById: "UPDATE users SET phone_number=? WHERE id=?",
    updateAddressById: "UPDATE users SET address=? WHERE id=?",
    updateProfilePictureById: "UPDATE users SET picture=? WHERE id=?",
    deleteByEmail: "DELETE FROM users WHERE email=?",
  },
  doctors: {
    getAll: "SELECT * FROM doctors",
    getById: "SELECT * FROM doctors WHERE doc_id=?",
    getByDepartment: "SELECT * FROM doctors WHERE routename=?",
    getByEmail: "SELECT * FROM doctors WHERE email=?",
    postNew:
      "INSERT INTO doctors(first_name, last_name, email, phone_number, speciality, gender, role, picture, routename,available_from, available_to) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    updatePhoneNumberById: "UPDATE doctors SET phone_number=? WHERE doc_id=?",
    updateProfilePictureById: "UPDATE doctors SET  picture=? WHERE doc_id=?",
    deleteByEmail: "DELETE FROM doctors WHERE email=?",
  },
  appointments: {
    getAll: "SELECT*FROM appointments",
    getById: "SELECT*FROM appointments WHERE appt_id=?",
    getByEmail: "SELECT*FROM appointments WHERE ref_email=?",
    getByEmailAndId: "SELECT*FROM appointments WHERE ref_email=? AND appt_id=?",
    getByDoctorsEmail: "SELECT * FROM appointments WHERE doc_email=?",
    postNew:
      "INSERT INTO appointments(patient_name, patient_age,patient_contact, patient_gender, patient_address, doc_id, ref_doctor, department, appt_type,appt_date,patient_issue,appt_fee,doc_email,appt_status,ref_email,paid,payment_method,booking_date,tran_id,appt_time,unique_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    updateStatusPrescriptionTestPreferenceById:
      "UPDATE appointments SET appt_status=?, prescription=?, test_preferences=? WHERE appt_id=?",
  },
  reviews: {
    getAll: "SELECT * FROM reviews",
    postNew: "INSERT INTO reviews(name, email, comment) VALUES(?,?,?)",
  },
  vaccineforms: {
    getAll: "SELECT*FROM vaccineforms",
    getByToken: "SELECT * FROM vaccineforms WHERE token=?",
    postNew:
      "INSERT INTO vaccineforms(fullname,age,gender,contact,vaccine_name,shortname,email,status,token,reg_date) VALUE (?,?,?,?,?,?,?,?,?,?)",
    updateStatusById: "UPDATE vaccineforms SET status=? WHERE id=?",
  },
  labtests: {
    getAll: "SELECT*FROM lab_tests",
    getByUniqueId: "SELECT*FROM lab_tests WHERE unique_id=?",
    getByEmail: "SELECT*FROM lab_tests WHERE email=?",
    getByEmailAndId: "SELECT*FROM lab_tests WHERE email=? AND id=?",
    postNew:
      "INSERT INTO lab_tests(fullname,age,gender,contact,email,number_of_tests, tests,registered_by,registers_email,payable_amount,advanced_amount,due_amount,payment_status,report_status,unique_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    updatePaymentStatusByUniqueId:
      "UPDATE lab_tests SET payment_status=?, due_amount=? WHERE unique_id=?",
    updateReportByUniqueId:
      "UPDATE lab_tests SET report_status=?, report=? WHERE unique_id=?",
  },
  forgotPassword:{
    updatePasswordByEmail: 'UPDATE users SET password=? WHERE email=?'
  }
};
