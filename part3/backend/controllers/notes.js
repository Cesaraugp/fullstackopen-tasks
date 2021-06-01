const notesRouter= require('express').Router();
const Note= require('../models/note');


  notesRouter.get('/', (request, response) => {
    Note.find({}).then((r) => {
      response.json(r)
    })
  })
  
  notesRouter.get('/:id', (request, response, next) => {
    const id = request.params.id
    Note.findById(id)
      .then((note) => {
        if (note) {
          response.json(note)
        } else {
          response.status(404).end()
        }
      })
      .catch((error) => {
        next(error)
      })
  })
  
  notesRouter.delete('/:id', (request, response,next) => {
    const id = Number(request.params.id)
    Note.findByIdAndRemove(id)
      .then(() => {
        response.status(204).end()
      })
      .catch((error) => next(error))
  })
  
  notesRouter.post('/', (req, res, next) => {
    const body = req.body
  
    if (!body.content) {
      return res.status(400).json({
        error: 'content missing',
      })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note
      .save()
      .then((savedNote) => savedNote.toJSON())
      .then((saveAndFormattedNote) => res.json(saveAndFormattedNote))
      .catch((error) => next(error))
  })
  
  notesRouter.put('/:id', (req, res, next) => {
    const body = req.body
    const note = {
      content: body.content,
      important: body.important,
    }
    Note.findByIdAndUpdate(req.params.id, note, { new: true })
      .then((updatedNote) => {
        res.json(updatedNote)
      })
      .catch((error) => next(error))
  })

  module.exports=notesRouter: