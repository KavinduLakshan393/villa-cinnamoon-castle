import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/packages
 * Fetch active packages categorized by weekend and weekday
 */
router.get('/', async (req, res) => {
  try {
    const allPackages = await prisma.package.findMany({
      orderBy: { rate: 'asc' }
    });

    const parsedPackages = allPackages.map(pkg => ({
      ...pkg,
      inclusions: JSON.parse(pkg.inclusions || '[]')
    }));

    const weekend = parsedPackages.filter(p => p.category === 'weekend');
    const weekday = parsedPackages.filter(p => p.category === 'weekday');

    res.json({
      success: true,
      packages: {
        weekend,
        weekday,
        all: parsedPackages
      }
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve packages.' });
  }
});

export default router;
