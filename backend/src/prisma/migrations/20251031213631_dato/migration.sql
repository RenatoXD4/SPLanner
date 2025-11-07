/*
  Warnings:

  - You are about to drop the column `colorId` on the `Tarea` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Tarea" DROP CONSTRAINT "Tarea_colorId_fkey";

-- AlterTable
ALTER TABLE "public"."Tarea" DROP COLUMN "colorId";
