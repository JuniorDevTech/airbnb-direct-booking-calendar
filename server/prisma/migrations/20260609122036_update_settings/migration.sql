-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "autoSyncEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true;
