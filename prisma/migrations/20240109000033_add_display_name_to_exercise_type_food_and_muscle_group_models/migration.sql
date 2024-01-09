/*
  Warnings:

  - Added the required column `display_name` to the `ExerciseType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `MuscleGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseType" ADD COLUMN     "display_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "display_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MuscleGroup" ADD COLUMN     "display_name" TEXT NOT NULL;
