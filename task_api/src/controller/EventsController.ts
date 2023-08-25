import { getRepository } from "typeorm";
import { Events } from '../entity/Event'
import { Request, Response } from "express";
import * as multer from 'multer';

//=======================================================
// Buscar todos os eventos
export const getEvents = async (resquest: Request, response: Response) => {
  const events = await getRepository(Events).find()
  return response.json(events)
};
//=======================================================

//=======================================================
// Buscar evento por ID
export const getEventID = async (request: Request, response: Response) => {
  const { id } = request.params
  const events = await getRepository(Events).findOne({ where: { id: parseInt(id, 10) } });
  return response.json(events)
}

// Criar evento
export const createEvents = async (request: Request, response: Response) => {
  const events = await getRepository(Events).save(request.body)
  return response.json(events)
}
//=======================================================

//=======================================================
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
//=======================================================

//=======================================================
// Upar imagem do evento

//=======================================================

//=======================================================
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
//=======================================================

//=======================================================
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
//=======================================================

