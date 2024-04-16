-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "mobileno" TEXT NOT NULL,
    "addressNickName" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "flateNOBuildingNOCompanyStreet" TEXT,
    "landMark" TEXT NOT NULL,
    "localitySectorArea" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "addressType" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
