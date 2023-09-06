import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        const notes = noteService.getNotes()
        setNotes(notes)
        console.log(notes);
        console.log('notes');
    }, [])

    if (!notes) return <div>Loading...</div>

    return (
        <section>
            <div>note app</div>
            <NoteList notes={notes} />
        </section>
    )
}
