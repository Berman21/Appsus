const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailFilter({ searchBar, filterBy, onSetFilterBy, onSetSort }) {

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
                console.log(target.value);
                if (target.value === 'true') {
                    value = true
                } else if (target.value === 'false') {
                    value = false
                } else {
                    value = null
                }
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

    function setVal({ target }) {
        // console.log(target.value);
    }

    const { txt, isRead } = filterByToEdit

    if (searchBar) {
        return (
            <section className="mail-search">
                <form onSubmit={onSubmitFilter}>

                    <label htmlFor="txt"></label>
                    <input value={txt} onChange={handleChange} type="text" placeholder="Search mail" id="txt" name="txt" />

                </form>

                <button onClick={() => onSetSort('sentAt', true)}>Sort latest</button>
                <button onClick={() => onSetSort('sentAt', false)}>Sort Oldest</button>
            </section>
        )
    } else {
        return (
            <section className='mail-side-bar' >


                <article className='compose'>
                    <Link to={`/mail/compose`}><i className="fa-solid fa-pencil side-bar-tool"></i>Compose</Link>
                </article>


                <label htmlFor="showAll">
                    <article className='mail-filter'><i className="fa-solid fa-envelopes-bulk side-bar-tool"></i>
                        Show all
                        <input label='aaaa' type="radio" id="showAll" name="isRead" value='' onChange={handleChange} />
                    </article>
                </label>

                <label htmlFor="isRead">
                    <article className='mail-filter'><i className="fa-solid fa-envelope-open side-bar-tool"></i>
                        Show read mails
                        <input type="radio" id="isRead" name="isRead" value={true} onChange={handleChange} />
                    </article>
                </label>

                <label htmlFor="unread">
                    <article className='mail-filter'><i className="fa-solid fa-envelope side-bar-tool"></i>
                        Show Unread mails
                        <input type="radio" id="unread" name="isRead" value={false} onChange={handleChange} />
                    </article>
                </label>

                <label htmlFor="inbox">
                    <article className='mail-filter'><i className="fa-solid fa-inbox side-bar-tool"></i>
                        Inbox
                        <input type="radio" id="inbox" name="filter" value="inbox" onChange={setVal} />
                    </article>
                </label>

                <label htmlFor="starred">
                    <article className='mail-filter'><i className="fa-regular fa-star side-bar-tool"></i>
                        Starred
                        <input type="radio" id="starred" name="filter" value="starred" onChange={setVal} />
                    </article>
                </label>

                <label htmlFor="sent">
                    <article className='mail-filter'><i className="fa-regular fa-paper-plane side-bar-tool"></i>
                        Sent
                        <input type="radio" id="sent" name="filter" value="sent" onChange={setVal} />
                    </article>
                </label>

                <label htmlFor="draft">
                    <article className='mail-filter'><i className="fa-regular fa-clipboard side-bar-tool"></i>
                        draft
                        <input type="radio" id="draft" name="filter" value="draft" onChange={setVal} />
                    </article>
                </label>

            </section>
        )

    }
}