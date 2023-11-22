import prisma from "../db";

export const createMuscleGroup = async (req, res, next) => {
  try {
    const muscleGroup = await prisma.muscleGroup.create({
      data: {
        name: req.body.name,
      },
    });

    res.json({ data: muscleGroup });
  } catch (e) {
    next(e);
  }
};
