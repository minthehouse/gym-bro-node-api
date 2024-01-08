import prisma from "../db";

export const getWorkouts = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.userId),
      },
      include: {
        workouts: {
          include: { exercises: true },
        },
      },
    });

    const workouts = user?.workouts || [];

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getWorkoutById = async (req, res) => {
  const workoutId = parseInt(req.params.workoutId);
  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    include: {
      exercises: true,
    },
  });

  if (!workout) {
    res.status(404);
    return res.json({
      message: `Workout is not found by workoutId: ${workoutId}`,
    });
  }

  res.json({
    workout,
  });
};

export const createWorkout = async (req, res, next) => {
  try {
    const { exercise_attributes } = req.body;

    const workout = await prisma.workout.create({
      data: {
        exercises: {
          create: createExercises(exercise_attributes),
        },
        user_id: parseInt(req.params.userId),
        start_at: req.body.start_at,
        end_at: req.body.end_at,
      },
      include: {
        exercises: true,
      },
    });

    console.log("workout", workout);

    res.json({ data: workout });
  } catch (e) {
    next(e);
  }
};

const createExercises = (exerciseAttributes) => {
  return exerciseAttributes.map((exercise) => ({
    weight: exercise.weight,
    rep: exercise.rep,
    exercise_type_id: exercise.exercise_type_id,
    // ... other exercise properties
  }));
};
