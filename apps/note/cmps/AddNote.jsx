const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, isRead } = filterByToEdit

    return (
        <section className="Note-filter">
            <form onSubmit={onSubmitFilter}>

                <label htmlFor="txt"></label>
                <input value={txt} onChange={handleChange} type="text" placeholder="Search note" id="txt" name="txt" />

                <button>Set Filter</button>
            </form>
        </section>
    )
}