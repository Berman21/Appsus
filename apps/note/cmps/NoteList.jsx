import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote }) {

    console.log(notes);


    return (
        <ul className="note-list">
            {notes.map(note =>
                <li className="note-list" key={note.id} style={note.style}>
                    <NotePreview note={note} />
                    <section>
                        <button onClick={() => onRemoveNote(note.id)}>Remove note</button>
                    </section>
                </li>
            )}
        </ul>
    )
}
