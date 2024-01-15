/*
  Warnings:

  - Added the required column `user_account_id` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "user_account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "group" ADD COLUMN     "user_account_id" INTEGER;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
