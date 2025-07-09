import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';

export const healthCheckHandler = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    console.error("Health check DB error:", (error as Error).message);
    res.status(503).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: (error as Error).message,
    });
  }
};
