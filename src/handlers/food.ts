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

export const searchFood = async (req, res, next) => {
  try {
    const searchParam = req.query.search_param;
    const servingWeight = req.query.serving_weight;

    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchParam}&api_key=${process.env.FOOD_API_KEY}&pageSize=10`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    const processedResponse = processApiResponse(responseData, servingWeight);

    res.json(processedResponse);
  } catch (e) {}
};

function processApiResponse(response, servingWeight) {
  const simplifiedFoods = response.foods.map((food) => ({
    name: food.description,
    calories: extractNutrientValue(food, "Energy", servingWeight),
    protein: extractNutrientValue(food, "Protein", servingWeight),
    fat: extractNutrientValue(food, "Total lipid (fat)", servingWeight),
    carbohydrates: extractNutrientValue(
      food,
      "Carbohydrate, by difference",
      servingWeight
    ),
  }));

  return simplifiedFoods;
}

function extractNutrientValue(food, nutrientName, servingWeight) {
  const nutrients = food.foodNutrients || [];
  const nutrient = nutrients.find(
    (nutrient) => nutrient.nutrientName === nutrientName
  );
  if (nutrient && servingWeight) {
    // Adjust the value based on the servingWeight
    return (nutrient.value * servingWeight) / food.servingSize;
  }
  return nutrient ? nutrient.value : 0;
}
