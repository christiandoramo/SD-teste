import { AssentoService } from "../services/assentos.js";

export class AssentosController {
  async create(request, response) {
    const { positionNumber, price } = request.body;

    const assentoService = new AssentoService();

    const newAssento = await assentoService.create({
      positionNumber,
      price,
    });
    return response.status(201).json(newAssento);
  }
  async listAll(request, response) {
    const assentoService = new AssentoService();

    const assentos = await assentoService.listAll();
    return response.status(200).json(assentos);
  }

  async findByPositionNumber(request, response) {
    const { positionNumber } = request.params;

    const assentoService = new AssentoService();

    const assento = await assentoService.findByPositionNumber(positionNumber);
    return response.status(200).json(assento);
  }
}
