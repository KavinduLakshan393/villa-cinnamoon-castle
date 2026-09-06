import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Villa Cinnamoon Castle database...');

  // 1. Clear existing data
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.package.deleteMany();
  await prisma.admin.deleteMany();

  // 2. Seed Master Packages (package_details.md)
  const packages = [
    // Weekend Packages
    {
      id: 'pkg-wknd-nonac',
      title: 'Weekend Standard — Non-A/C',
      category: 'weekend',
      rate: 21000,
      maxPax: 15,
      bedrooms: 'Full 5 Bedrooms',
      isAc: false,
      description: 'Full private villa buyout with powerful ceiling fans throughout all 5 bedrooms and living halls. Includes full kitchen, BBQ courtyard, and private grounds.',
      inclusions: JSON.stringify([
        'Full private 5-bedroom villa buyout (up to 15 guests)',
        'Powerful ceiling fans in all suites & mezzanine lounge',
        'Fully equipped granite kitchen & dining banquet',
        'Gated gravel courtyard & dedicated BBQ pavilion',
        'High-speed Wi-Fi & 2 hot water bathrooms'
      ])
    },
    {
      id: 'pkg-wknd-ac',
      title: 'Weekend Premium — A/C',
      category: 'weekend',
      rate: 23000,
      maxPax: 15,
      bedrooms: 'Full 5 Bedrooms',
      isAc: true,
      description: 'Full private villa buyout featuring air-conditioned master suites. Premium luxury linens, ceiling fans throughout, full kitchen access, and courtyard.',
      inclusions: JSON.stringify([
        'Full private 5-bedroom villa buyout (up to 15 guests)',
        'Air conditioning in master bedrooms + ceiling fans throughout',
        'Fully equipped chef kitchen & double-burner gas stove',
        'Private gravel courtyard & evening BBQ setups',
        'High-speed Wi-Fi & 2 hot water bathrooms'
      ])
    },

    // Weekday Packages
    {
      id: 'pkg-wkday-couple',
      title: 'Couples Package',
      category: 'weekday',
      rate: 6500,
      maxPax: 2,
      bedrooms: '1 Master Suite',
      isAc: true,
      description: 'Intimate and peaceful full-day retreat for two guests with private master bedroom, hot water bathroom, and kitchen access.',
      inclusions: JSON.stringify([
        '1 private master bedroom with A/C and workspace desk',
        'Private modern bathroom with instant hot water',
        'Access to full granite kitchen, dining table & courtyard',
        'High-speed Wi-Fi & peaceful cinnamon grove surroundings'
      ])
    },
    {
      id: 'pkg-wkday-family',
      title: 'Family Package',
      category: 'weekday',
      rate: 8500,
      maxPax: 4,
      bedrooms: '1–2 Family Rooms',
      isAc: false,
      description: 'Affordable getaway tailored for nuclear families (parents + kids) near Hikkaduwa beach. Complete privacy with dining and cooking facilities.',
      inclusions: JSON.stringify([
        'Dedicated family bedroom arrangement for up to 4 guests',
        'Full kitchen access with gas stove and cookware',
        'Spacious living room and gravel courtyard play area',
        'High-speed Wi-Fi & hot water bathroom'
      ])
    },
    {
      id: 'pkg-wkday-2room-nac',
      title: '2-Room Group (Non-A/C)',
      category: 'weekday',
      rate: 8500,
      maxPax: 4,
      bedrooms: '2 Bedrooms',
      isAc: false,
      description: 'Economical option for 2 couples or small friend groups. Ceiling fans and open breeze corridors.',
      inclusions: JSON.stringify([
        '2 comfortable bedrooms with solid wooden beds',
        'High-efficiency silent ceiling fans',
        'Living hall, kitchen, dining area & Wi-Fi'
      ])
    },
    {
      id: 'pkg-wkday-2room-ac',
      title: '2-Room Group (A/C)',
      category: 'weekday',
      rate: 10500,
      maxPax: 4,
      bedrooms: '2 Bedrooms (A/C)',
      isAc: true,
      description: 'Air-conditioned comfort across 2 bedrooms for up to 4 travelers.',
      inclusions: JSON.stringify([
        '2 air-conditioned bedrooms',
        'Ground living room with TV & kitchen access',
        'High-speed Wi-Fi & hot shower facilities'
      ])
    },
    {
      id: 'pkg-wkday-3room-nac',
      title: '3-Room Group (Non-A/C)',
      category: 'weekday',
      rate: 12500,
      maxPax: 6,
      bedrooms: '3 Bedrooms',
      isAc: false,
      description: 'Well-suited for mid-sized groups seeking relaxation in nature.',
      inclusions: JSON.stringify([
        '3 allocated bedrooms for up to 6 guests',
        'Ceiling fans, kitchen, living spaces & Wi-Fi'
      ])
    },
    {
      id: 'pkg-wkday-3room-ac',
      title: '3-Room Group (A/C)',
      category: 'weekday',
      rate: 14500,
      maxPax: 6,
      bedrooms: '3 Bedrooms (A/C)',
      isAc: true,
      description: 'Air-conditioned comfort for medium families or friend groups up to 6 pax.',
      inclusions: JSON.stringify([
        '3 bedrooms with air conditioning',
        'Full living, dining, kitchen & courtyard access'
      ])
    },
    {
      id: 'pkg-wkday-4room-nac',
      title: '4-Room Group (Non-A/C)',
      category: 'weekday',
      rate: 15500,
      maxPax: 8,
      bedrooms: '4 Bedrooms',
      isAc: false,
      description: 'Spacious 4-bedroom setup for traveling groups up to 8 guests.',
      inclusions: JSON.stringify([
        '4 bedrooms with solid wooden beds & ceiling fans',
        'Mezzanine lounge, ground TV living room & full kitchen'
      ])
    },
    {
      id: 'pkg-wkday-4room-ac',
      title: '4-Room Group (A/C)',
      category: 'weekday',
      rate: 17500,
      maxPax: 8,
      bedrooms: '4 Bedrooms (A/C)',
      isAc: true,
      description: '4 air-conditioned suites for large families and friend reunions.',
      inclusions: JSON.stringify([
        '4 air-conditioned bedrooms',
        'Exclusive common spaces & high-speed Wi-Fi'
      ])
    },
    {
      id: 'pkg-wkday-full-nac',
      title: 'Full Villa Buyout (Non-A/C)',
      category: 'weekday',
      rate: 17900,
      maxPax: 15,
      bedrooms: 'Full 5 Bedrooms',
      isAc: false,
      description: 'Entire estate buyout during weekdays. 100% private grounds and amenities.',
      inclusions: JSON.stringify([
        'Full private 5-bedroom villa buyout (up to 15 guests)',
        'Ceiling fans in all suites, kitchen, and BBQ courtyard'
      ])
    },
    {
      id: 'pkg-wkday-full-ac',
      title: 'Full Villa Buyout (A/C)',
      category: 'weekday',
      rate: 19900,
      maxPax: 15,
      bedrooms: 'Full 5 Bedrooms (A/C)',
      isAc: true,
      description: 'Our premier weekday package. Full estate exclusivity with air-conditioned suites.',
      inclusions: JSON.stringify([
        'Full private 5-bedroom villa buyout with A/C suites',
        'Ground living room, upstairs mezzanine lounge, kitchen & courtyard'
      ])
    }
  ];

  for (const pkg of packages) {
    await prisma.package.create({ data: pkg });
  }
  console.log(`Created ${packages.length} packages.`);

  // 3. Seed Admin Credentials
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.admin.create({
    data: {
      username: 'admin',
      passwordHash
    }
  });
  console.log('Created default admin: username=admin, password=admin123');

  // 4. Seed Approved Bookings (These create calendar red-blocks)
  const bookingPast1 = await prisma.booking.create({
    data: {
      id: 'VCC-2026-PAST01',
      customerName: 'Dr. Kusal Perera',
      whatsAppNumber: '+94771234567',
      checkIn: new Date('2026-08-14T00:00:00.000Z'),
      checkOut: new Date('2026-08-16T00:00:00.000Z'),
      totalNights: 2,
      weekendNights: 2,
      weekdayNights: 0,
      dateType: 'WEEKEND',
      guestCount: 14,
      packageId: 'pkg-wknd-ac',
      packageName: 'Weekend Premium — A/C',
      status: 'APPROVED',
      totalPrice: 46000
    }
  });

  const bookingPast2 = await prisma.booking.create({
    data: {
      id: 'VCC-2026-PAST02',
      customerName: 'Elena Rostova',
      whatsAppNumber: '+94769876543',
      checkIn: new Date('2026-08-25T00:00:00.000Z'),
      checkOut: new Date('2026-08-27T00:00:00.000Z'),
      totalNights: 2,
      weekendNights: 0,
      weekdayNights: 2,
      dateType: 'WEEKDAY',
      guestCount: 2,
      packageId: 'pkg-wkday-couple',
      packageName: 'Couples Package',
      status: 'APPROVED',
      totalPrice: 13000
    }
  });

  // Upcoming approved bookings that highlight red in the calendar
  await prisma.booking.create({
    data: {
      id: 'VCC-2026-BLK01',
      customerName: 'Roshan Bandara',
      whatsAppNumber: '+94715554321',
      checkIn: new Date('2026-09-12T00:00:00.000Z'),
      checkOut: new Date('2026-09-14T00:00:00.000Z'),
      totalNights: 2,
      weekendNights: 2,
      weekdayNights: 0,
      dateType: 'WEEKEND',
      guestCount: 12,
      packageId: 'pkg-wknd-ac',
      packageName: 'Weekend Premium — A/C',
      status: 'APPROVED',
      totalPrice: 46000
    }
  });

  await prisma.booking.create({
    data: {
      id: 'VCC-2026-BLK02',
      customerName: 'Nuwan Jayasinghe',
      whatsAppNumber: '+94703332211',
      checkIn: new Date('2026-09-25T00:00:00.000Z'),
      checkOut: new Date('2026-09-27T00:00:00.000Z'),
      totalNights: 2,
      weekendNights: 2,
      weekdayNights: 0,
      dateType: 'WEEKEND',
      guestCount: 10,
      packageId: 'pkg-wknd-nonac',
      packageName: 'Weekend Standard — Non-A/C',
      status: 'APPROVED',
      totalPrice: 42000
    }
  });

  // 5. Seed Verified Reviews (linked to past approved bookings)
  await prisma.review.create({
    data: {
      bookingId: bookingPast1.id,
      guestName: 'Dr. Kusal Perera',
      rating: 5,
      stayType: 'Family Reunion (14 Guests)',
      title: 'The ultimate private family sanctuary in Hikkaduwa',
      comment: 'We booked the full villa buyout for a long weekend family reunion. Having 5 private bedrooms and complete exclusivity was priceless. The kitchen had everything we needed to cook our own meals, and host Devindu organized a delicious BBQ grill in the gravel courtyard for our final night. Spotlessly clean, breezy, and peaceful!',
      isPinned: true,
      createdAt: new Date('2026-08-17T10:00:00.000Z')
    }
  });

  await prisma.review.create({
    data: {
      bookingId: bookingPast2.id,
      guestName: 'Elena Rostova',
      rating: 5,
      stayType: 'Couples Retreat',
      title: 'Peaceful cinnamon surroundings just 5 minutes from surf',
      comment: 'We booked the weekday Couples package. The Master bedroom was spacious with crisp A/C and high-speed internet that allowed me to work remotely without any issues. It was lovely waking up to the sounds of birds instead of town noise. We will definitely return!',
      isPinned: false,
      createdAt: new Date('2026-08-28T14:30:00.000Z')
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
