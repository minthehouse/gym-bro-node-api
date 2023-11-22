import { Router } from "express";
import { createMuscleGroup } from "./handlers/muscle_group";
import { createExerciseType } from "./handlers/exercise_type";
import { createWorkout, getWorkoutById, getWorkouts } from "./handlers/workout";

const router = Router();

router.post("/muscle_group", createMuscleGroup);
router.post("/exercise_type", createExerciseType);
router.post("/user/:userId/workout", createWorkout);
router.get("/user/:userId/workout", getWorkouts);
router.get("/workout/:workoutId", getWorkoutById);

export default router;
