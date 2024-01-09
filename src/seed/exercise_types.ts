import prisma from "../db";

export async function seedExerciseTypes() {
  try {
    const exerciseTypeData = [
      { name: "leg press", muscle_group_name: "legs" },
      { name: "leg extension", muscle_group_name: "legs" },
      { name: "leg curl", muscle_group_name: "legs" },
      { name: "calf raise", muscle_group_name: "legs" },
      { name: "squat", muscle_group_name: "legs" },
      { name: "deadlift", muscle_group_name: "back" },
      { name: "lat pull down", muscle_group_name: "back" },
      { name: "seated row (machine)", muscle_group_name: "back" },
      { name: "seated row (cable)", muscle_group_name: "back" },
      { name: "bench press", muscle_group_name: "chest" },
      { name: "chest press (machine)", muscle_group_name: "chest" },
      { name: "closed grip bench press", muscle_group_name: "chest" },
      { name: "weighted pull up", muscle_group_name: "back" },
      { name: "weighted chin up", muscle_group_name: "back" },
      { name: "dumbbell row", muscle_group_name: "back" },
      { name: "dumbbell bench press", muscle_group_name: "chest" },
      { name: "dumbbell fly", muscle_group_name: "chest" },
      { name: "dumbbell curl", muscle_group_name: "biceps" },
      { name: "dumbbell hammer curl", muscle_group_name: "biceps" },
      { name: "dumbbell tricep extension", muscle_group_name: "triceps" },
      { name: "dumbbell tricep kickback", muscle_group_name: "triceps" },
      { name: "dumbbell shoulder press", muscle_group_name: "shoulders" },
      { name: "dumbbell lateral raise", muscle_group_name: "shoulders" },
      { name: "dumbbell front raise", muscle_group_name: "shoulders" },
      { name: "dumbbell rear delt fly", muscle_group_name: "shoulders" },
      { name: "dumbbell shrug", muscle_group_name: "shoulders" },
      { name: "dumbbell pullover", muscle_group_name: "chest" },
      // { name: "dumbbell side bend", muscle_group_name: "core" },
      // { name: "dumbbell russian twist", muscle_group_name: "core" },
      // { name: "dumbbell sit up", muscle_group_name: "core" },
      // { name: "dumbbell leg raise", muscle_group_name: "core" },
      // { name: "dumbbell crunch", muscle_group_name: "core" },
      // { name: "dumbbell reverse crunch", muscle_group_name: "core" },
      // { name: "dumbbell side crunch", muscle_group_name: "core" },
      // { name: "dumbbell bicycle crunch", muscle_group_name: "core" },
      // { name: "dumbbell plank", muscle_group_name: "core" },
      // { name: "dumbbell side plank", muscle_group_name: "core" },
      { name: "dumbbell push up", muscle_group_name: "chest" },
      { name: "dumbbell reverse fly", muscle_group_name: "shoulders" },
      { name: "dumbbell upright row", muscle_group_name: "shoulders" },
      { name: "barbell curl", muscle_group_name: "biceps" },
      { name: "barbell row", muscle_group_name: "back" },
    ];
    const exerciseTypesWithDisplayName = await Promise.all(
      exerciseTypeData.map(async (exercise) => {
        const muscleGroupId = await getMuscleGroupIdByName(
          exercise.muscle_group_name
        );

        if (!muscleGroupId) {
          throw new Error(
            `Muscle group not found: ${exercise.muscle_group_name}`
          );
        }

        return {
          ...exercise,
          muscle_group_id: muscleGroupId,
          display_name: capitalizeAllWords(exercise.name),
        };
      })
    );

    const newArrayWithoutMuscleGroupName = exerciseTypesWithDisplayName.map(
      ({ muscle_group_name, ...rest }) => rest
    );

    await prisma.exerciseType.createMany({
      data: newArrayWithoutMuscleGroupName,
    });

    // await prisma.exerciseType.deleteMany({
    //   where: {},
    // });
  } catch (error) {
    console.error("Error seeding exercise types:", error);
  } finally {
    await prisma.$disconnect();
  }
}

function capitalizeAllWords(str: string) {
  return str.replace(/(?:^|\s|["'([{])\S/g, (char) => char.toUpperCase());
}

const getMuscleGroupIdByName = async (muscleGroupName: string) => {
  const muscleGroup = await prisma.muscleGroup.findFirst({
    where: { name: muscleGroupName },
    select: { id: true },
  });

  return muscleGroup ? muscleGroup.id : null;
};
