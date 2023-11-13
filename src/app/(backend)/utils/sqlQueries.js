export const sqlQueries = {
    usersApiQueries:{
        getAllUsers: "SELECT * FROM users",
        getUserById: "SELECT * FROM users WHERE id=?",
        getUserByEmail: "SELECT * FROM users WHERE email = ?",
        postNewUser: "INSERT INTO users(fullname,email,password,userRole,gender,picture) VALUES(?,?,?,?,?,?)",
        updateUserRoleById: "UPDATE users SET userRole=? WHERE id=?",
        updateUserPasswordById: "UPDATE users SET password=? WHERE id=?",
        updateUserPhoneNumberById:"UPDATE users SET phone_number=? WHERE id=?",
        updateUserAddressById:"UPDATE users SET address=? WHERE id=?",
        updateUserProfilePictureById:"UPDATE users SET picture=? WHERE id=?",
        deleteUserByEmail:"DELETE FROM users WHERE email=?",
    }
}