/*
  Warnings:

  - A unique constraint covering the columns `[nombre,proyectoId]` on the table `Estado` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Estado_nombre_proyectoId_key" ON "public"."Estado"("nombre", "proyectoId");
