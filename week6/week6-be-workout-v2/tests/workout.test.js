const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("when there is initially some workouts saved", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0])
      .send(workouts[1]);
  });

  it("should return all workouts in JSON format when GET /api/workouts is called", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should allow adding a new workout successfully when POST /api/workouts is called", async () => {
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);
  });

  it("should return one workout by ID when GET /api/workouts/:id is called", async () => {
    const workout = await Workout.findOne();
    await api
      .get("/api/workouts/" + workout._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one workout by ID when PATCH /api/workouts/:id is called", async () => {
    const workout = await Workout.findOne();
    console.log(workout._id);
    const updatedWorkout = {
      title: "test workout",
      reps: 5,
      load: 50
    };
    await api
      .patch("/api/workouts/" + workout._id)
      .set("Authorization", "bearer " + token)
      .send(updatedWorkout)
      .expect(200);
    const updatedWorkoutCheck = await Workout.findById(workout._id);
    expect(updatedWorkoutCheck.toJSON()).toEqual(
      expect.objectContaining(updatedWorkout)
    );
  });

  it("should delete one workout by ID when DELETE /api/workouts/:id is called", async () => {
    const workout = await Workout.findOne();
    await api
      .delete("/api/workouts/" + workout._id)
      .set("Authorization", "bearer " + token)
      .expect(204);
    const workoutCheck = await Workout.findById(workout._id);
    expect(workoutCheck).toBeNull();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
