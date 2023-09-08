const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailFilter({ searchBar,filterBy, onSetFilterBy }) {

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

            case 'radio':
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

    function setVal(val) {
        console.log(val);
    }

    const { txt, isRead } = filterByToEdit

    if (searchBar) {
        return (
            <section className="Mail-filter">
                <form onSubmit={onSubmitFilter}>

                    <label htmlFor="txt"></label>
                    <input value={txt} onChange={handleChange} type="text" placeholder="Search mail" id="txt" name="txt" />

                </form>
            </section>
        )
    } else {
        return (
            <section className='mail-side-bar' >


                <article className='compose'>
                    <Link to={`/mail/compose`}><i className="fa-solid fa-pencil side-bar-tool"></i>Compose</Link>
                </article>

                <label htmlFor="inbox">
                    <article className='mail-filter'><i className="fa-solid fa-inbox side-bar-tool"></i>
                        Inbox
                        <input type="radio" id="inbox" name="filter" value="inbox" onChange={ev => setVal(ev.target.value)} />
                    </article>
                </label>

                <label htmlFor="starred">
                    <article className='mail-filter'><i className="fa-regular fa-star side-bar-tool"></i>
                        Starred
                        <input type="radio" id="starred" name="filter" value="starred" onChange={ev => setVal(ev.target.value)} />
                    </article>
                </label>

                <label htmlFor="sent">
                    <article className='mail-filter'><i className="fa-regular fa-paper-plane side-bar-tool"></i>
                        Sent
                        <input type="radio" id="sent" name="filter" value="sent" onChange={ev => setVal(ev.target.value)} />
                    </article>
                </label>

                <label htmlFor="draft">
                    <article className='mail-filter'><i className="fa-regular fa-clipboard side-bar-tool"></i>
                        draft
                        <input type="radio" id="draft" name="filter" value="draft" onChange={ev => setVal(ev.target.value)} />
                    </article>
                </label>

            </section>
        )

    }
}