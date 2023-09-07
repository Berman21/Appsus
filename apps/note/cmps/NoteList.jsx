import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {

    console.log(notes);


    return (
        <ul className="note-list">
            {notes.map(note =>
                <li className="note-list" key={note.id} style={note.style}>
                    <NotePreview note={note} />
                    <section>
                        <button onClick={() => onRemoveNote(note.id)}>Remove note</button>
                        <button><Link to={`/note/edit/${note.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}
