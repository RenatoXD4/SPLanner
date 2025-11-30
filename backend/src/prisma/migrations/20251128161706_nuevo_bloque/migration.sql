/*
  Warnings:

  - The values [LINK] on the enum `TipoDeBloque` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."TipoDeBloque_new" AS ENUM ('PARAGRAPH', 'HEADING_1', 'HEADING_2', 'CHECKLIST', 'IMAGE', 'CODE', 'LINKTOOL');
ALTER TABLE "public"."BloqueContenido" ALTER COLUMN "tipo" TYPE "public"."TipoDeBloque_new" USING ("tipo"::text::"public"."TipoDeBloque_new");
ALTER TYPE "public"."TipoDeBloque" RENAME TO "TipoDeBloque_old";
ALTER TYPE "public"."TipoDeBloque_new" RENAME TO "TipoDeBloque";
DROP TYPE "public"."TipoDeBloque_old";
COMMIT;
