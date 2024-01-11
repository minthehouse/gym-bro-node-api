import prisma from "../db";

interface MuscleGroupCreateRequestBody {
  name: string;
  display_name: string;
}

export const createMuscleGroup = async (req, res, next) => {
  try {
    const { name, display_name }: MuscleGroupCreateRequestBody = req.body;

    const muscleGroup = await prisma.muscleGroup.create({
      data: {
        name,
        display_name,
      },
    });

    res.json({ data: muscleGroup });
  } catch (e) {
    next(e);
  }
};
