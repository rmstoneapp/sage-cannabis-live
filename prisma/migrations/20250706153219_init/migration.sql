-- CreateEnum
CREATE TYPE "StrainType" AS ENUM ('INDICA', 'SATIVA', 'HYBRID');

-- CreateEnum
CREATE TYPE "GrowDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'NEEDS_REVIEW');

-- CreateTable
CREATE TABLE "strains" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "strainName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "strainType" "StrainType" NOT NULL,
    "dispensary" TEXT,
    "thcPercentage" DOUBLE PRECISION,
    "cbdPercentage" DOUBLE PRECISION,
    "cbgPercentage" DOUBLE PRECISION,
    "cbnPercentage" DOUBLE PRECISION,
    "terpeneProfile" JSONB,
    "effects" TEXT[],
    "medicalUses" TEXT[],
    "description" TEXT,
    "flavorProfile" TEXT,
    "aroma" TEXT,
    "floweringTime" TEXT,
    "yield" TEXT,
    "difficulty" "GrowDifficulty",
    "containerImage" TEXT,
    "terpeneImage" TEXT,
    "cannabinoidImage" TEXT,
    "budImage" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNotes" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "submittedBy" TEXT,
    "submitterEmail" TEXT,

    CONSTRAINT "strains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_recommendations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ageRange" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "experience" INTEGER,
    "conditions" TEXT[],
    "desiredEffects" TEXT[],
    "consumptionMethod" TEXT,
    "preferredTiming" TEXT,
    "tolerance" TEXT,
    "recommendations" JSONB,
    "sessionId" TEXT,
    "ipAddress" TEXT,

    CONSTRAINT "user_recommendations_pkey" PRIMARY KEY ("id")
);
