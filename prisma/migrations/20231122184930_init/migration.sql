-- CreateTable
CREATE TABLE "Diet" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "taken_at" TIMESTAMP(3),

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "muscle_group_id" INTEGER,

    CONSTRAINT "ExerciseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION,
    "rep" INTEGER,
    "exercise_type_id" INTEGER,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "calories" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "protein" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carbohydrates" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "fat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "diet_id" INTEGER NOT NULL,
    "meal_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "serving_weight" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "goal" TEXT,
    "gender" TEXT,
    "age" INTEGER,
    "height_in_feet" INTEGER,
    "height_in_inches" INTEGER,
    "weight" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_at" TIMESTAMP(3),
    "end_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseType" ADD CONSTRAINT "ExerciseType_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "MuscleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_exercise_type_id_fkey" FOREIGN KEY ("exercise_type_id") REFERENCES "ExerciseType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_diet_id_fkey" FOREIGN KEY ("diet_id") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_meal_type_id_fkey" FOREIGN KEY ("meal_type_id") REFERENCES "MealType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
