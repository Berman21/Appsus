import { storageService } from '../../../services/async-storage.service.js'
import { storageServiceSync } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    duplicateNote,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.type) {
                const regExp = new RegExp(filterBy.type, 'i')
                notes = notes.filter(note => regExp.test(note.type))
            }
            if (filterBy.txt) {
                notes = notes.filter(note => note.info.txt.includes(filterBy.txt));
            }
            return notes
        })
}

function getDefaultFilter() {
    return { txt: '' }
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(createdAt = 1112222, type = 'NoteTxt', isPinned = false, style = { backgroundColor: '#FFB6B9' }, info = '') {
    return {
        createdAt,
        type,
        isPinned,
        style,
        info,
    }
}

function _createNote(createdAt, type, isPinned, style, info) {
    const note = getEmptyNote(createdAt, type, isPinned, style, info)
    note.id = utilService.makeId()
    return note
}

function _createNotes() {
    let notes = storageServiceSync.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#efeff1' }, { txt: 'Idea for a new project at work.' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#e9e3d4' }, { txt: 'Grocery shopping list for the weekend.' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#f6e2dd' }, { txt: 'Quote from TED Talk: Creativity is intelligence having fun..' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#aeccdc' }, { txt: 'Phone numbers of friends for a call.' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#d4e4ed' }, { txt: 'Idea for a birthday gift.' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#d3bfdb' }, { txt: 'Quote from a page in the book Im reading.'}))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#b4ddd3' }, { txt: 'Vocabulary words for learning.' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#e2f6d3' }, { txt: 'Plan for a weekend getaway.' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#fff8b8' }, { txt: 'Daily tasks: Pay the bill, go shopping, write an email to the manager.' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#f39f76' }, { txt: 'List of movies I want to watch.' }))
        notes.push(_createNote(1112222, 'NoteTxt', true, { backgroundColor: '#faafa8' }, { txt: 'Notes from the meeting with the team.' }))
        storageServiceSync.saveToStorage(NOTE_KEY, notes)
    }
}

function duplicateNote(createdAt, type, isPinned, style, info) {
    let dupNote = getEmptyNote(createdAt, type, isPinned, style, info)
    save(dupNote)
}