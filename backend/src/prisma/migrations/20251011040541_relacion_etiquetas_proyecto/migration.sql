/*
  Warnings:

  - A unique constraint covering the columns `[nombre,proyectoId]` on the table `Etiqueta` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Etiqueta_nombre_key";

-- AlterTable
ALTER TABLE "public"."Etiqueta" ADD COLUMN     "proyectoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Etiqueta_nombre_proyectoId_key" ON "public"."Etiqueta"("nombre", "proyectoId");

-- AddForeignKey
ALTER TABLE "public"."Etiqueta" ADD CONSTRAINT "Etiqueta_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "public"."Proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
