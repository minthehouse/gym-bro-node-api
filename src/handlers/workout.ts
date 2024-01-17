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
      exercises: {
        include: {
          ExerciseType: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!workout) {
    res.status(422);
    return res.json({
      message: `Workout is not found by workoutId: ${workoutId}`,
    });
  }

  const workoutWithExerciseTypeNames = {
    ...workout,
    exercises: workout.exercises.map((exercise) => ({
      ...exercise,
      exercise_type_name: exercise.ExerciseType.name,
    })),
  };

  res.json(workoutWithExerciseTypeNames);
};

export const createWorkout = async (req, res, next) => {
  try {
    const { workout } = req.body;
    const { exercises_attributes, user_id, start_at, end_at } = workout;

    const newWorkout = await prisma.workout.create({
      data: {
        exercises: {
          create: createExercises(exercises_attributes),
        },
        user_id: parseInt(user_id),
        start_at,
        end_at,
      },
      include: {
        exercises: true,
      },
    });

    res.json({ data: newWorkout });
  } catch (e) {
    next(e);
  }
};

const createExercises = (exerciseAttributes) => {
  return exerciseAttributes.map((exercise) => ({
    weight: parseInt(exercise.weight),
    rep: parseInt(exercise.rep),
    exercise_type_id: parseInt(exercise.exercise_type_id),
  }));
};

export const updateWorkout = async (req, res, next) => {
  try {
    const { workout } = req.body;
    const { exercises_attributes, user_id, start_at, end_at } = workout;

    let updatedExercises = [];

    const exercises = await prisma.exercise.findMany({
      where: {
        workout_id: parseInt(req.params.workoutId),
        id: {
          in: exercises_attributes.map((exercise) => parseInt(exercise.id)),
        },
      },
    });

    res.json({ data: [] });
  } catch (e) {
    next(e);
  }
};
