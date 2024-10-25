const request = require("supertest");
const testData = require("../test_data/testData");
const validUserToken = "eyJhbGciOiJI...";

describe("Create User Tests", function () {
  it("Creates user with required field", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/users")
      .send(testData.newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("success");
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toContain("eyJhbGciOiJI");
  });
  it("refuses to create user with already registered email", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/users")
      .send(testData.newUser);
    expect(response.status).toBe(401);
    expect(response.body.token).toBeUndefined();
  });
  it("refuses to create user with empty username", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/users")
      .send(testData.newUserEmptyName);
    expect(response.status).toBe(401);
    expect(response.body.token).toBeUndefined();
  });
  it("refuses to create user with invalid email format", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/users")
      .send(testData.newUserInvalidEmail);
    expect(response.status).toBe(401);
    expect(response.body.token).toBeUndefined();
  });
  it("refuses to create duplicate user", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/users")
      .send(testData.newUser);
    expect(response.status).toBe(401);
  });
});

describe("Authenticate Use Tests", function () {
  it("Logs in with valid credentials", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/auth")
      .send({
        email: testData.newUser.email,
        password: testData.newUser.password,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toContain("eyJhbGciOiJI");
  });
  it("Does not log in with empty email", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/auth")
      .send(testData.loginEmptyMail);
    expect(response.status).toBe(401);
    expect(response.body.token).toBeUndefined();
  });
  it("Does not log with wrong password", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/auth")
      .send(testData.loginWrongPassword);
    expect(response.status).toBe(401);
    expect(response.body.token).toBeUndefined();
  });
});

describe("Get User By Token Tests", function () {
  it("Returns user with valid credentials", async function () {
    const response = await request(testData.localHosts.host_8000)
      .get("/api/v1/users")
      .set("Authorization", validUserToken);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toContain(testData.newUser.name);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toContain(testData.newUser.email);
    expect(response.body).toHaveProperty("password");
    expect(response.body.password).toContain(testData.newUser.password);
  });
  it("Gives an error on empty token", async function () {
    const response = await request(testData.localHosts.host_8000)
      .get("/api/v1/users")
      .set("Authorization", "");
    expect(response.status).toBe(403);
  });
});

describe("Patch User By Token Tests", function () {
  it("Patches user with valid token", async function () {
    const response = await request(testData.localHosts.host_8000)
      .patch("/api/v1/users")
      .set("Authorization", validUserToken)
      .send(testData.patchedUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("success");
  });
  it("Does not patch user with empty token", async function () {
    const response = await request(testData.localHosts.host_8000)
      .patch("/api/v1/users")
      .set("Authorization", "")
      .send(testData.patchedUser);
    expect(response.status).toBe(403);
  });
});

describe("Delete User by Token Tests", function () {
  it("Does not delete with empty token", async function () {
    const response = await request(testData.localHosts.host_8000)
      .delete("/api/v1/users")
      .set("Authorization", "");
    expect(response.status).toBe(403);
  });
  it("Deletes user with valid token", async function () {
    const response = await request(testData.localHosts.host_8000)
      .delete("/api/v1/users")
      .set("Authorization", validUserToken);
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("success");
  });
});

describe("Delete All Users Tests", function () {
  it("Does not delete all users with a wrong admin key", async function () {
    const response = await request(testData.localHosts.host_8000)
      .delete("/api/v1/all-users")
      .send(testData.invalidAdminKey);
    expect(response.status).toBe(403);
  });
  it("Deletes all users with valid admin key", async function () {
    const response = await request(testData.localHosts.host_8000)
      .delete("/api/v1/all-users")
      .send(testData.adminKey);
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("success");
  });
  it("Recreates a deleted user", async function () {
    const response = await request(testData.localHosts.host_8000)
      .post("/api/v1/users")
      .send(testData.newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("success");
  });
});
