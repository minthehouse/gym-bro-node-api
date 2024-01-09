import prisma from "../db";

export const createExerciseType = async (req, res, next) => {
  try {
    const exerciseType = await prisma.exerciseType.create({
      data: {
        name: req.body.name,
        display_name: req.body.display_name,
        muscle_group_id: req.body.muscle_group_id,
      },
    });

    res.json({ data: exerciseType });
  } catch (e) {
    next(e);
  }
};

export const getExerciseTypes = async (req, res, next) => {
  try {
    const exerciseTypes = await prisma.exerciseType.findMany();
    res.json({ data: exerciseTypes });
  } catch (e) {
    next(e);
  }
};

export const searchExerciseType = async (req, res, next) => {
  try {
    const exerciseTypes = await prisma.exerciseType.findMany({
      where: {
        name: {
          contains: req.query.search_param.toLowerCase(),
        },
      },
    });

    res.json(exerciseTypes); // send the response back to the client
  } catch (e) {
    next(e);
  }
};
