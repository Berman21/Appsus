const { Link } = ReactRouterDOM

export function MailSideBar() {

    function setVal(val) {
        console.log(val);
    }

    return (
        <section className='mail-side-bar' >


            <article className='compose'>
                <Link to={`/mail/compose`}><i className="fa-solid fa-pencil side-bar-tool"></i>Compose</Link>
            </article>

            <label htmlFor="inbox">
                <article className='mail-filter'><i className="fa-solid fa-inbox side-bar-tool"></i>
                    Inbox
                    <input type="radio" id="inbox" name="filter" value="inbox" onChange={ev=>setVal(ev.target.value)}/>
                </article>
            </label>

            <label htmlFor="starred">
                <article className='mail-filter'><i className="fa-regular fa-star side-bar-tool"></i>
                    Starred
                    <input type="radio" id="starred" name="filter" value="starred" onChange={ev=>setVal(ev.target.value)}/>
                </article>
            </label>

            <label htmlFor="sent">
                <article className='mail-filter'><i className="fa-regular fa-paper-plane side-bar-tool"></i>
                    Sent
                    <input type="radio" id="sent" name="filter" value="sent" onChange={ev=>setVal(ev.target.value)}/>
                </article>
            </label>

            <label htmlFor="draft">
                <article className='mail-filter'><i className="fa-regular fa-clipboard side-bar-tool"></i>
                    draft
                    <input type="radio" id="draft" name="filter" value="draft" onChange={ev=>setVal(ev.target.value)}/>
                </article>
            </label>

        </section>
    )
}