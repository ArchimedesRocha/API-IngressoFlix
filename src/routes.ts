import { Router, Request, Response } from 'express'

import { getEvents, createEvents, getEventID, updateEvents, finishedEvent, deleteEvent,  } from './controller/EventsController';

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message:'Hello World!' })
})

routes.get('/events', getEvents)
routes.get('/events/:id', getEventID )
routes.put('/events/:id', updateEvents )
routes.patch('/events/:id', finishedEvent )
routes.delete('/events/:id', deleteEvent )
routes.post('/create', createEvents )

export default routes