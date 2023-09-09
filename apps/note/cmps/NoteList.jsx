import { NotePreview } from "./NotePreview.jsx"
import { NotePalette } from "./NotePalette.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onDuplicateNote, onChangeColor }) {

    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        setVisibility(visibility)
    }, [visibility])

    function isVisible() {
        setVisibility(!visibility)
    }

    return (
        <article className="cards ">
            {notes.map(note =>
                <div className="card" key={note.id} style={note.style}>
                    <NotePreview note={note} />
                    <section className="card-tools">
                        <button className="remove-btn" title="Delete" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
                        <button className="duplicate-btn" title="Duplicate" onClick={() => onDuplicateNote(note)}><i className="fa-solid fa-copy"></i></button>
                        <button className="palette-btn" title="Palette" onClick={() => isVisible()}><i className="fa-solid fa-palette"></i></button>

                        {visibility && <NotePalette note={note} onChangeColor={onChangeColor} />}

                        <button className="edit-btn" title="Edit"><Link to={`/note/edit/${note.id}`
                        }><i className="fa-solid fa-pen-to-square"></i></Link></button>
                    </section>
                </div >
            )
            }
        </article >
    )
}
