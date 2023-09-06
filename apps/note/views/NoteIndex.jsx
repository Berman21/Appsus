import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        const notes = noteService.getNotes()
        setNotes(notes)
    }, [])

    function onRemoveNote(noteId) {
        console.log('hi');
        console.log(noteId);
        noteService.remove(noteId)
        .then(() => {
            setNotes(prevNotes => {
                console.log(prevNotes);
                    prevNotes.filter(note => note.id !== noteId)
                })
                showSuccessMsg(`note Removed! ${noteId}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + noteId)
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <div>note app</div>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />

        </section>
    )
}
