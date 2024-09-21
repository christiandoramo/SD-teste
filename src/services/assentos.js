import { prisma } from "../prismaClient.js"; // Importa o Prisma Client Singleton

export class AssentoService {
  async create({ positionNumber, price }) {
    const assento = await prisma.assento.create({
      data: {
        positionNumber,
        price,
      },
    });

    return assento;
  }

  async findByPositionNumber({ positionNumber }) {
    const assento = await prisma.assento.findFirts({
      where: {
        positionNumber,
      },
    });

    return assento;
  }

  async listAll() {
    const assento = await prisma.assento.findMany({});
    return assento;
  }
}
