/*
  Warnings:

  - Made the column `proyectoId` on table `Etiqueta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Etiqueta" ALTER COLUMN "proyectoId" SET NOT NULL;
