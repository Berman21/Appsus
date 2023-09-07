import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {

    console.log(notes);


    return (
        <article className="cards ">
            {notes.map(note =>
                <div className="card" key={note.id} style={note.style}>
                    <NotePreview note={note} />
                    <section className="card-tools">
                        <button onClick={() => onRemoveNote(note.id)}><i class="fa-solid fa-trash-can"></i></button>
                        <button><Link to={`/note/edit/${note.id}`}><i class="fa-solid fa-pen-to-square"></i></Link></button>
                    </section>
                </div>
            )}
        </article>
    )
}
