-- DropForeignKey
ALTER TABLE "Vechile" DROP CONSTRAINT "Vechile_owner_fkey";

-- AddForeignKey
ALTER TABLE "Vechile" ADD CONSTRAINT "Vechile_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
