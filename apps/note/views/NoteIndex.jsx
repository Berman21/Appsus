import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

// יש קומפוננטה של add note האם באמת צריך או למחוק? 

const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => {
                console.log(notes);
                setNotes(notes)

            })
            .catch(err => console.log('err:', err))
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        console.log(filterBy);
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

    function onLoadNotes() {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
    }

    if (!notes) return <div>Loading...</div>
    return (

        <section className="note-index">
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link to="/note/edit">Add Note</Link>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />

            <section>
                <Outlet context={{ onLoadNotes }} />
            </section>
        </section>

    )
}
