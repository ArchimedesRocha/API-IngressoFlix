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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/users');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extendImage = ['image/png', 'image/jpg', 'image/jpeg'].find(
      (formAccepted) => formAccepted == file.mimetype
    );

    if (extendImage) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

export const uploadImageEvent = (req: Request, res: Response) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading file' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = (req.file as any).filename;
    const filePath = `./public/upload/users/${filename}`;

    res.status(200).json({
      message: 'Upload successful',
      filePath: filePath,
    });
  });
};


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

