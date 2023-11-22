/*
  Warnings:

  - Made the column `muscle_group_id` on table `ExerciseType` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ExerciseType" DROP CONSTRAINT "ExerciseType_muscle_group_id_fkey";

-- AlterTable
ALTER TABLE "ExerciseType" ALTER COLUMN "muscle_group_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ExerciseType" ADD CONSTRAINT "ExerciseType_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
