import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        noteService.query()
            .then(notes => {
                    console.log('b',notes);
                setNotes(notes)
                    console.log('a',notes);
            })
            .catch(err => console.log('err:', err))
    }, [])

    // useEffect(() => {
    //     const notes = noteService.getNotes()
    //     setNotes(notes)
    //     console.log('hi');
    // }, [])

    function onRemoveNote(noteId) {
        console.log(noteId);
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => {
                    prevNotes.filter(note => note.id !== noteId)
                    console.log(prevNotes);
                })
                // owSuccessMsg(`note Removed! ${noteId}`)
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Problem Removing ' + noteId)
            })
    }

    // function onSetFilterBy(filterBy) {
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    // }

    console.log('notes', notes);
    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            {/* <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
            <div>note app</div>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />

        </section>
    )
}
