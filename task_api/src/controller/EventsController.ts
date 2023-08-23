import { getRepository } from "typeorm";
import { Events } from '../entity/Event'
import { Request, Response } from "express";

// Buscar todos os eventos
export const getEvents = async (resquest: Request, response: Response) => {
  const events = await getRepository(Events).find()
  return response.json(events)
};

// Buscar evento por ID
export const getEventID = async (request: Request, response: Response) => {
  const { id } = request.params
  const events = await getRepository(Events).findOne({ where: { id: parseInt(id, 10) } });
  return response.json(events)
}

// Criar evento
export const saveEvents = async (request: Request, response: Response) => {
  const events = await getRepository(Events).save(request.body)
  return response.json(events)
}

// Atualizar evento
export const updateEvents = async (request: Request, response: Response) => {
  const { id } = request.params
  const events = await getRepository(Events).update(id, request.body)

  if (events.affected === 1) {
    const eventUpdated = await getRepository(Events).findOne({ where: { id: parseInt(id, 10) } });
    return response.json(eventUpdated)
  }

  return response.status(404).json({ message: 'Event not found!'})
}

// Upar imagem
export const uploadEventImage = async (request: Request, response: Response) => {
  console.log("Request Body:", request.body);
  console.log("Request Files:", request.files);
  console.log("Request ID", request.params);

  const imageFile = request.file; // Arquivo de imagem enviado
  const { id } = request.params;

  if (!imageFile) {
    return response.status(400).json({ message: 'No image uploaded!' });
  }
  
  // Construir a URL da imagem baseada no caminho do arquivo no servidor
  const imageURL = `http://localhost:3333/events/${id}/${imageFile.filename}`;
  console.log("Image URL:", imageURL);

  // Atualizar o evento com a URL da imagem
  await getRepository(Events).update(id, { imageURL });

  // Buscar o evento atualizado
  const eventUpdated = await getRepository(Events).findOne({ where: { id: parseInt(id, 10) } });

  if (eventUpdated) {
    return response.json(eventUpdated);
  } else {
    return response.status(404).json({ message: 'Event not found!' });
  }
};

// Finalizar evento
export const finishedEvent = async (request: Request, response: Response) => {
  const { id } = request.params
  const events = await getRepository(Events).update(id, {
    finished: true
  })

  if (events.affected === 1) {
    const eventUpdated = await getRepository(Events).findOne({ where: { id: parseInt(id, 10) } });
    return response.json({ message: 'Event finished'})
  }

  return response.status(404).json({ message: 'Event not found!'})
}

// Deletar evento
export const deleteEvent = async (request: Request, response: Response) => {
  const { id } = request.params
  const events = await getRepository(Events).delete(id)

  if (events.affected === 1) {
    const eventUpdated = await getRepository(Events).findOne({ where: { id: parseInt(id, 10) } });
    return response.json({ message: 'Event deleted!'})
  }

  return response.status(404).json({ message: 'Event not found!'})
}

