-- AlterTable
ALTER TABLE "Exchange" ALTER COLUMN "is_accepted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "is_paid" SET DEFAULT false;
