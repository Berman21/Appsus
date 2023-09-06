import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes }) {

    console.log(notes);


    return (
        <ul className="note-list">
            <section>
                {notes.map(note =>
                    <article className="note-list" key={note.id} style={note.style}>
                        <NotePreview note={note} />
                    </article>
                )}
            </section>
        </ul>
    )
}
