import { ToggleisRead } from "./ToggleIsRead.jsx"

const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isOn, setIsOn] = useState(false)

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
        <section className="Mail-filter">
            <form onSubmit={onSubmitFilter}>

                <label htmlFor="txt"></label>
                <input value={txt} onChange={handleChange} type="text" placeholder="Search mail" id="txt" name="txt" />
                <ToggleisRead val={isOn} setVal={setIsOn} />

                <button>Set Filter</button>
            </form>
        </section>
    )
}