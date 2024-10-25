module.exports = {
  newUser: {
    name: "usernametestest",
    email: "useremailtesttest@gmail.com",
    password: "user123",
  },
  newUserEmptyName: {
    name: "",
    email: "useremail1@gmail.com",
    password: "user123",
  },
  newUserInvalidEmail: {
    name: "username1212",
    email: "useremail1.com",
    password: "user123",
  },

  loginEmptyMail: {
    email: "",
    password: "user123",
  },
  loginWrongPassword: {
    email: "useremail@gmail.com",
    password: "testpassword",
  },
  patchedUser: {
    name: "newName",
    email: "new_email@gmail.com",
    password: "newpassword123",
  },

  adminKey: {
    key_admin: "keyadmin123",
  },

  invalidAdminKey: { key_admin: "" },

  localHosts: { host_8000: "http://localhost:8000" },
};
