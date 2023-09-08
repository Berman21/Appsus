import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onDuplicateNote }) {

    // console.log(notes);


    return (
        <article className="cards ">
            {notes.map(note =>
                // console.log(note)
                <div className="card" key={note.id} style={note.style}>
                    <NotePreview note={note} />
                    <section className="card-tools">
                        <button onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
                        <button onClick={() => onDuplicateNote(note.createdAt, note.type, note.isPinned, note.style, note.info)}><i className="fa-solid fa-copy"></i></button>
                        <button><Link to={`/note/edit/${note.id}`
                        }><i className="fa-solid fa-pen-to-square"></i></Link></button>
                    </section>
                </div>
            )}
        </article>
    )
}
