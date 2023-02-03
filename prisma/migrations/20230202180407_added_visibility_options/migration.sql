-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('VISIBLE', 'INVISIBLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN',
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE';
