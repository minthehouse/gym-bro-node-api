import prisma from "../db";

interface FoodCreateRequestBody {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  serving_weight: number;
  diet_id: number;
  meal_type_id: number;
}

export const createFood = async (req, res, next) => {
  try {
    const {
      name,
      calories,
      protein,
      carbohydrates,
      fat,
      serving_weight,
      diet_id,
      meal_type_id,
    }: FoodCreateRequestBody = req.body;

    const food = await prisma.food.create({
      data: {
        name,
        calories,
        protein,
        carbohydrates,
        fat,
        serving_weight,
        diet: { connect: { id: diet_id } },
        meal_type: { connect: { id: meal_type_id } },
      } as any,
      include: {
        diet: true,
        meal_type: true,
      },
    });

    res.json({ data: food });
  } catch (e) {
    next(e);
  }
};
