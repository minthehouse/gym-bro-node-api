import prisma from "../db";

export const createExerciseType = async (req, res, next) => {
  try {
    const exerciseType = await prisma.exerciseType.create({
      data: {
        name: req.body.name,
        muscle_group_id: req.body.muscle_group_id,
      },
    });

    res.json({ data: exerciseType });
  } catch (e) {
    next(e);
  }
};
