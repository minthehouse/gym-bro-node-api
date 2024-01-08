import prisma from "../db";

export const createFood = async (req, res, next) => {
  try {
    const food = await prisma.food.create({
      data: {
        name: req.body.name,
        calories: req.body.calories,
        protein: req.body.protein,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat,
        meal_type_id: req.body.meal_type_id,
        serving_weight: req.body.serving_weight,
        diet_id: req.body.diet_id,
      },
      include: {
        diet: true,
        meal_type: true,
      },
    });
  } catch (e) {}
};
