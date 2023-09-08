import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams, useOutletContext } = ReactRouterDOM


export function NoteEdit() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [editClass, setEditClass] = useState('add-note')
    const navigate = useNavigate()
    const params = useParams()
    const { onLoadNotes } = useOutletContext()

    useEffect(() => {
        if (params.noteId) {
            loadNote()
            setEditClass('edit-note')
        }
        if (!params.noteId) setEditClass('add-note')
    }, [])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
    }

    function handleTxtChange({ target }) {
        let value = target.value
        const info = { ...noteToEdit.info, txt: value }
        console.log(info);
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, info }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                navigate('/note')
                onLoadNotes()
            })
            .catch(err => console.log('err:', err))

    }

    return (
        <section className={editClass}>
            <div className="backdrop"></div>
                <form onSubmit={onSaveNote} >

                    <label htmlFor="txt"></label>
                    <input className="txt-input" onChange={handleTxtChange}
                        value={noteToEdit.info.txt} type="text" name="txt" id="txt" placeholder="Add text.." />

                    <button className="submit-btn">Save</button>
                </form>
        </section>
    )
}