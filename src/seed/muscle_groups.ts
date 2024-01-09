import prisma from "../db";

export async function seedMuscleGroups() {
  try {
    await prisma.muscleGroup.createMany({
      data: [
        {
          name: "chest",
          display_name: "Chest",
        },
        {
          name: "back",
          display_name: "Back",
        },
        {
          name: "legs",
          display_name: "Legs",
        },
        {
          name: "shoulders",
          display_name: "Shoulders",
        },
        {
          name: "biceps",
          display_name: "Biceps",
        },
        {
          name: "triceps",
          display_name: "Triceps",
        },
        {
          name: "abs",
          display_name: "Abs",
        },
      ],
    });
    // await prisma.muscleGroup.deleteMany({
    //   where: {},
    // });
  } catch (error) {
    console.error("Error seeding muscle groups:", error);
  } finally {
    await prisma.$disconnect();
  }
}
