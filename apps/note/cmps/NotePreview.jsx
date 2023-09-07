export function NotePreview({ note }) {

    return (

        <div className="note-preview">
            <p>{note.info.txt}</p>
        </div>
    )
}
