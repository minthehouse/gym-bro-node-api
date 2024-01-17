import { Router } from "express";
import { createMuscleGroup } from "./handlers/muscle_group";
import {
  createExerciseType,
  getExerciseTypes,
  searchExerciseType,
} from "./handlers/exercise_type";
import {
  createWorkout,
  getWorkoutById,
  getWorkouts,
  updateWorkout,
} from "./handlers/workout";
import { body } from "express-validator";
import { createFood } from "./handlers/food";

const router = Router();

router.post("/workout", createWorkout);
router.get("/users/:userId/workouts", getWorkouts);
router.get("/workout/:workoutId", getWorkoutById);
router.put("/workout/:workoutId", updateWorkout);

router.post("/exercise_type", createExerciseType);
router.get("/exercise_type", getExerciseTypes);
router.get("/exercise_types/search", searchExerciseType);

router.post(
  "/muscle_group",
  body("name").isString().notEmpty(),
  createMuscleGroup
);

router.post("/user/:userId/food", createFood);

export default router;
