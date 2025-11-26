const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

const initialWorkouts = [
  {
    title: "test workout 1",
    reps: 11,
    load: 101,
  },
  {
    title: "test workout 2",
    reps: 12,
    load: 102,
  },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});

describe("when there are initially some workouts saved", () => {
  it("should return all workouts", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  it("should include a specific workout in the returned list", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });

  it("should return workouts as json", async () => {
    await api
      .get("/api/workouts")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should save a new workout successfully", async () => {
    const newWorkout = {
      title: "test workout x",
      reps: 19,
      load: 109,
    };
    await api.post("/api/workouts").send(newWorkout).expect(201);
  });

  it("should return all workouts including a newly added valid workout", async () => {
    const newWorkout = {
      title: "Situps",
      reps: 25,
      load: 10,
    };

    await api
      .post("/api/workouts")
      .send(newWorkout)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/workouts");

    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialWorkouts.length + 1);
    expect(contents).toContain("Situps");
  });

  it("should reject a workout without a title and not add it to the list", async () => {
    const newWorkout = {
      reps: 23,
    };

    await api.post("/api/workouts").send(newWorkout).expect(400);

    const response = await api.get("/api/workouts");

    expect(response.body).toHaveLength(initialWorkouts.length);
  });
});

describe("when deleting an existing workout", () => {
  it("should remove the workout when given a valid id", async () => {
    const workoutsAtStart = await workoutsInDb();
    const workoutToDelete = workoutsAtStart[0];

    await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

    const workoutsAtEnd = await workoutsInDb();
    expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

    const contents = workoutsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(workoutToDelete.title);

    // expect(true).toBe(true);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
