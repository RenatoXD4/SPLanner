-- AlterTable
ALTER TABLE "public"."Tarea" ADD COLUMN     "lastModifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastModifiedById" TEXT;

-- CreateTable
CREATE TABLE "public"."TareaEditor" (
    "id" SERIAL NOT NULL,
    "tareaId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "TareaEditor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TareaEditor_tareaId_usuarioId_key" ON "public"."TareaEditor"("tareaId", "usuarioId");

-- AddForeignKey
ALTER TABLE "public"."TareaEditor" ADD CONSTRAINT "TareaEditor_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "public"."Tarea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TareaEditor" ADD CONSTRAINT "TareaEditor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tarea" ADD CONSTRAINT "Tarea_lastModifiedById_fkey" FOREIGN KEY ("lastModifiedById") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
