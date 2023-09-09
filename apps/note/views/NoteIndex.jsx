import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)

            })
            .catch(err => console.log('err:', err))
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`note Removed! ${noteId}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + noteId)
            })
    }

    function onDuplicateNote({ createdAt, type, isPinned, style, info }) {
        noteService.duplicateNote(createdAt, type, isPinned, style, info)
        onLoadNotes()
    }

    function onChangeColor(noteId, color) {

        const newNote = notes.find(note => {
            if (note.id === noteId) {
                note.style = color
                return note
            }
        })
        noteService.save(newNote)
        onLoadNotes()
    }

    function onLoadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                console.log(notes);
                setNotes(notes)
            })
    }

    if (!notes) return <div>Loading...</div>
    return (

        <section className="note-index">

            <section>
                <Outlet context={{ onLoadNotes }} />
            </section>

            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link className="add-note" to="/note/edit">Add Note</Link>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote}
                onChangeColor={onChangeColor} />

        </section>

    )
}
