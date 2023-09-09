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

    // function handleTxtChange({ target }) {
    //     let value = target.value
    //     const info = { ...filterByToEdit.info, txt: value }
    //     console.log(info);
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, info }))
    // }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { type: txt } = filterByToEdit

    return (
        <section className="filter-container">
            <form onSubmit={onSubmitFilter}>

                <label htmlFor="txt"></label>
                <input className="Note-filter" value={txt} onChange={handleChange} type="text" placeholder="Search note" id="txt" name="txt" />
            </form>
        </section>
    )
}