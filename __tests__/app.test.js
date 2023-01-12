const request = require("supertest");
const app = require("../src/app");
const subscribersSchema = require("../src/models/subscribers");

describe("GET /subscribers/:id", () => {
    
  it("should return a 500 status code and an error message if an error occurs while retrieving the subscribers", async () => {
    // Mocking the error scenario
    const spy = jest
      .spyOn(subscribersSchema, "find")
      .mockImplementationOnce(() => {
        throw new Error("Error while finding subscribers");
      });

    const res = await request(app).get("/subscribers");

    // Assert that the response has a 500 status code
    expect(res.statusCode).toEqual(500);

    // Assert that the response has an error message
    expect(res.body).toHaveProperty(
      "message",
      "An error occurred while retrieving subscribers."
    );

    // Reset the mock
    spy.mockReset();
  });

  it("should return a 400 status code if the provided ID is not a valid ObjectId", async () => {
    // Make a GET request to the /subscribers/:id route with an invalid ID
    const res = await request(app).get("/subscribers/invalid-id");
    // Assert that the response has a 400 status code
    expect(res.statusCode).toEqual(400);
    // Assert that the response has an appropriate error message
    expect(res.body).toHaveProperty("error", "Invalid subscriber ID.");
  });
});
