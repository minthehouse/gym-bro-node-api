/*
  Warnings:

  - Made the column `password_confirmation` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password_confirmation" SET NOT NULL;
