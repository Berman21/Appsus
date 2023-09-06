import { storageService } from '../../../services/async-storage.service.js'
import { storageServiceSync } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

// console.log('hi');

export const noteService = {
    query,
    getNotes,
    get,
    remove,
    save,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.type) {
                const regExp = new RegExp(filterBy.type, 'i')
                notes = notes.filter(note => regExp.test(note.type))
            }
            // console.log(notes);
            return notes
        })
}

function getDefaultFilter() {
    return { type: '' }
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            // note = _setNextPrevCarId(note)
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

function _createNotes() {
    let notes = storageServiceSync.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#FFB6B9',
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt: 1113322,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#BBDED6',
                },
                info: {
                    txt: 'Color Palettes for Designers'
                }
            },
        ]
        storageServiceSync.saveToStorage(NOTE_KEY, notes)
    }
    console.log(notes);
    // return notes
}

function getNotes() {
    return _createNotes()
}
