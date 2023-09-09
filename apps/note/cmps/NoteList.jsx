import { NotePreview } from "./NotePreview.jsx"
import { NotePalette } from "./NotePalette.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onDuplicateNote, onChangeColor }) {

    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        setVisibility(visibility)
        // console.log(visibility);
    }, [visibility])

    function isVisible() {
        setVisibility(!visibility)
    }

    return (
        <article className="cards ">
            {notes.map(note =>
                // console.log(note)
                <div className="card" key={note.id} style={note.style}>
                    <NotePreview note={note} />
                    <section className="card-tools">
                        <button onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
                        <button onClick={() => onDuplicateNote(note)}><i className="fa-solid fa-copy"></i></button>
                        <button title="palette" onClick={() => isVisible()}><i className="fa-solid fa-palette"></i></button>

                        {visibility && <NotePalette note={note} onChangeColor={onChangeColor} />}

                        <button><Link to={`/note/edit/${note.id}`
                        }><i className="fa-solid fa-pen-to-square"></i></Link></button>
                    </section>
                </div >
            )
            }
        </article >
    )
}
