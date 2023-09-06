import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import {NoteFilter} from "../cmps/NoteFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    // useEffect(() => {
    //     noteService.query()
    //         .then(notes => {
    //                 console.log('b',notes);
    //             setNotes(notes)
    //                 console.log('a',notes);
    //         })
    //         .catch(err => console.log('err:', err))
    // }, [])

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
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


    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <div>note app</div>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />

        </section>
    )
}
