import { z } from "zod";
import { prisma } from "../prismaClient.js"; // Importa o Prisma Client Singleton

// Schema de validação para os dados de Assento usando Zod
const assentoSchema = z.object({
  positionNumber: z.number().int("positionNumber deve ser um número inteiro."),
  price: z.number("price deve ser um número flutuante."),
});

export class AssentoService {
  async create({ positionNumber, price }) {
    // Valida os inputs antes de criar o registro no banco
    try {
      assentoSchema.parse({ positionNumber, price }); // Executa a validação

      // Criação do assento após a validação
      const assento = await prisma.assento.create({
        data: {
          positionNumber,
          price,
        },
      });

      return assento;
    } catch (error) {
      // Retorna o erro de validação do Zod se houver
      throw error;
    }
  }

  async findByPositionNumber({ positionNumber }) {
    // Valida a entrada positionNumber
    try {
      z.number()
        .int("positionNumber deve ser um número inteiro.")
        .parse(positionNumber);

      // Busca o assento no banco de dados
      const assento = await prisma.assento.findFirst({
        where: {
          positionNumber,
        },
      });

      return assento;
    } catch (error) {
      // Retorna o erro de validação se houver
      throw error;
    }
  }

  async listAll() {
    // Lista todos os assentos sem validação, já que não há entradas
    const assento = await prisma.assento.findMany({});
    return assento;
  }
}
