-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Role" TEXT[],
    "image" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vechile" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "total_miles_driven" TEXT NOT NULL,
    "date_of_purchase" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "energy_consumption_per_hour" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Vechile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vechile" ADD CONSTRAINT "Vechile_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
