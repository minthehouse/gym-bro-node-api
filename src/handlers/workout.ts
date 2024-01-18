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
        orderBy: {
          id: "asc",
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

    res.json({ success: true, data: newWorkout });
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
    const workoutId = parseInt(req.params.workoutId);
    const { exercises_attributes } = req.body.workout;

    // Transform exercises_attributes into the expected structure
    const exercisesData = exercises_attributes.map((exercise) => ({
      id: exercise.id || null,
      weight: parseInt(exercise.weight),
      rep: parseInt(exercise.rep),
      exercise_type_id: exercise.exercise_type_id,
    }));

    // Update exercises for the workout
    const updatedWorkout = await prisma.workout.update({
      where: { id: workoutId },
      data: {
        exercises: {
          create: exercisesData
            .filter((data) => !data.id)
            .map((data) => ({
              weight: data.weight,
              rep: data.rep,
              exercise_type_id: data.exercise_type_id,
            })),
          update: exercisesData
            .filter((data) => !!data.id)
            .map((data) => ({
              where: { id: data.id },
              data: {
                weight: data.weight,
                rep: data.rep,
              },
            })),
        },
      },
      include: {
        exercises: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    res.json({ success: true, data: updatedWorkout });
  } catch (e) {
    next(e);
  }
};
