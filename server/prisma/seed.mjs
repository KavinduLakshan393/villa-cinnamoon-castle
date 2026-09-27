import 'dotenv/config';
import { PrismaClient, CoolingType, StayType } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required to seed the database.');
}

const prisma = new PrismaClient();

const stayOptions = [
  {
    code: 'weekend-villa',
    publicName: 'The whole villa',
    publicDetail: 'All five bedrooms and every shared space',
    stayType: StayType.WEEKEND,
    minGuests: 1,
    maxGuests: 15,
    displayOrder: 1,
    variants: [
      { code: 'pkg-wknd-nonac', title: 'Weekend Standard — Non-A/C', coolingType: CoolingType.NON_AC, nightlyRate: 21000, displayOrder: 1 },
      { code: 'pkg-wknd-ac', title: 'Weekend Premium — A/C', coolingType: CoolingType.AC, nightlyRate: 23000, displayOrder: 2 },
    ],
  },
  {
    code: 'couples',
    publicName: 'Couples stay',
    publicDetail: 'One bedroom',
    stayType: StayType.WEEKDAY,
    minGuests: 1,
    maxGuests: 2,
    displayOrder: 1,
    variants: [
      { code: 'pkg-wkday-cpl', title: 'Couples Package', coolingType: CoolingType.NOT_APPLICABLE, nightlyRate: 6500, displayOrder: 1 },
    ],
  },
  {
    code: 'family',
    publicName: 'Family stay',
    publicDetail: 'Family sleeping setup arranged by the host',
    stayType: StayType.WEEKDAY,
    minGuests: 3,
    maxGuests: 4,
    displayOrder: 2,
    variants: [
      { code: 'pkg-wkday-fam', title: 'Family Package', coolingType: CoolingType.NOT_APPLICABLE, nightlyRate: 8500, displayOrder: 1 },
    ],
  },
  {
    code: 'two-bedroom',
    publicName: 'Two bedrooms',
    publicDetail: 'Two separate bedrooms',
    stayType: StayType.WEEKDAY,
    minGuests: 1,
    maxGuests: 4,
    displayOrder: 3,
    variants: [
      { code: 'pkg-wkday-2r-nac', title: '2-Room Group — Non-A/C', coolingType: CoolingType.NON_AC, nightlyRate: 8500, displayOrder: 1 },
      { code: 'pkg-wkday-2r-ac', title: '2-Room Group — A/C', coolingType: CoolingType.AC, nightlyRate: 10500, displayOrder: 2 },
    ],
  },
  {
    code: 'three-bedroom',
    publicName: 'Three bedrooms',
    publicDetail: 'Three bedrooms prepared',
    stayType: StayType.WEEKDAY,
    minGuests: 5,
    maxGuests: 6,
    displayOrder: 4,
    variants: [
      { code: 'pkg-wkday-3r-nac', title: '3-Room Group — Non-A/C', coolingType: CoolingType.NON_AC, nightlyRate: 12500, displayOrder: 1 },
      { code: 'pkg-wkday-3r-ac', title: '3-Room Group — A/C', coolingType: CoolingType.AC, nightlyRate: 14500, displayOrder: 2 },
    ],
  },
  {
    code: 'four-bedroom',
    publicName: 'Four bedrooms',
    publicDetail: 'Four bedrooms prepared',
    stayType: StayType.WEEKDAY,
    minGuests: 7,
    maxGuests: 8,
    displayOrder: 5,
    variants: [
      { code: 'pkg-wkday-4r-nac', title: '4-Room Group — Non-A/C', coolingType: CoolingType.NON_AC, nightlyRate: 15500, displayOrder: 1 },
      { code: 'pkg-wkday-4r-ac', title: '4-Room Group — A/C', coolingType: CoolingType.AC, nightlyRate: 17500, displayOrder: 2 },
    ],
  },
  {
    code: 'five-bedroom',
    publicName: 'All five bedrooms',
    publicDetail: 'Every bedroom prepared',
    stayType: StayType.WEEKDAY,
    minGuests: 9,
    maxGuests: 10,
    displayOrder: 6,
    variants: [
      { code: 'pkg-wkday-5r-nac', title: '5-Room Group — Non-A/C', coolingType: CoolingType.NON_AC, nightlyRate: 17900, displayOrder: 1 },
      { code: 'pkg-wkday-5r-ac', title: '5-Room Group — A/C', coolingType: CoolingType.AC, nightlyRate: 19900, displayOrder: 2 },
    ],
  },
  {
    code: 'full-villa',
    publicName: 'Full villa',
    publicDetail: 'Five bedrooms plus extra sleeping arrangements',
    stayType: StayType.WEEKDAY,
    minGuests: 11,
    maxGuests: 15,
    displayOrder: 7,
    variants: [
      { code: 'pkg-wkday-fv-nac', title: 'Full Villa — Non-A/C', coolingType: CoolingType.NON_AC, nightlyRate: 17900, displayOrder: 1 },
      { code: 'pkg-wkday-fv-ac', title: 'Full Villa — A/C', coolingType: CoolingType.AC, nightlyRate: 19900, displayOrder: 2 },
    ],
  },
];

async function main() {
  for (const option of stayOptions) {
    const { variants, ...optionData } = option;
    const stayOption = await prisma.stayOption.upsert({
      where: { code: option.code },
      update: { ...optionData, isActive: true, deletedAt: null },
      create: optionData,
    });

    for (const variant of variants) {
      await prisma.packageVariant.upsert({
        where: { code: variant.code },
        update: { ...variant, stayOptionId: stayOption.id, isActive: true, deletedAt: null },
        create: { ...variant, stayOptionId: stayOption.id },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
