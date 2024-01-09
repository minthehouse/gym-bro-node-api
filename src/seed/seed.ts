import { seedExerciseTypes } from "./exercise_types";
import { seedMuscleGroups } from "./muscle_groups";

async function seed() {
  try {
    await seedMuscleGroups();
    await seedExerciseTypes();
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seed();
