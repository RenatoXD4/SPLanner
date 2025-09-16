/*
  Warnings:

  - You are about to drop the column `fechaVencimiento` on the `Tarea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Tarea" DROP COLUMN "fechaVencimiento",
ADD COLUMN     "fechaLimite" DATE,
ALTER COLUMN "titulo" DROP NOT NULL;
