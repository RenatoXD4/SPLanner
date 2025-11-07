/*
  Warnings:

  - Added the required column `colorId` to the `Estado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Estado" ADD COLUMN     "colorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Estado" ADD CONSTRAINT "Estado_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
