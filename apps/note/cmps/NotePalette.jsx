export function NotePalette({ note, onChangeColor }) {

    return (

        <div className="palette">
            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#efeff1' })}
                className="palette-btn" style={{ backgroundColor: '#efeff1' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#e9e3d4' })}
                className="palette-btn" style={{ backgroundColor: '#e9e3d4' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#f6e2dd' })}
                className="palette-btn" style={{ backgroundColor: '#f6e2dd' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#d3bfdb' })}
                className="palette-btn" style={{ backgroundColor: '#d3bfdb' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#aeccdc' })}
                className="palette-btn" style={{ backgroundColor: '#aeccdc' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#d4e4ed' })}
                className="palette-btn" style={{ backgroundColor: '#d4e4ed' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#b4ddd3' })}
                className="palette-btn" style={{ backgroundColor: '#b4ddd3' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#e2f6d3' })}
                className="palette-btn" style={{ backgroundColor: '#e2f6d3' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#fff8b8' })}
                className="palette-btn" style={{ backgroundColor: '#fff8b8' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#f39f76' })}
                className="palette-btn" style={{ backgroundColor: '#f39f76' }}></button>

            <button onClick={() => onChangeColor(note.id, { backgroundColor: '#faafa8' })}
                className="palette-btn" style={{ backgroundColor: '#faafa8' }}></button>
        </div>
    )
}
