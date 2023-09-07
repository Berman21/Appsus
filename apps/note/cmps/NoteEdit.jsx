import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function NoteEdit() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.noteId) loadNote()
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
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, info }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => navigate('/note'))
            .catch(err => console.log('err:', err))

    }

    // const { vendor, maxSpeed } = noteToEdit

    return (
        <section className="car-edit">
            <form onSubmit={onSaveNote} >
                <label htmlFor="txt">Txt:</label>
                <input onChange={handleTxtChange} value={noteToEdit.info.txt} type="text" name="txt" id="txt" />

                <button>Save</button>
            </form>
        </section>
    )
}