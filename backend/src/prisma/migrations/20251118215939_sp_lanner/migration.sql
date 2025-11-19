/*
  Warnings:

  - The primary key for the `Notificacion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `proyectoId` to the `Notificacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Notificacion" DROP CONSTRAINT "Notificacion_pkey",
ADD COLUMN     "proyectoId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tipo" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Notificacion_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Notificacion" ADD CONSTRAINT "Notificacion_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "public"."Proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
