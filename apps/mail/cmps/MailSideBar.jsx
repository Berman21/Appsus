const { Link } = ReactRouterDOM

export function MailSideBar() {

    return (
        <section className='mail-side-bar'>
            <article className='compose'><Link to={`/mail/compose`}><i class="fa-solid fa-pencil side-bar-tool"></i>Compose</Link> </article>
            <article className='mail-filter'><i class="fa-solid fa-inbox side-bar-tool"></i>Inbox</article>
            <article className='mail-filter'><i className="fa-regular fa-star side-bar-tool"></i>Starred</article>
            <article className='mail-filter'><i class="fa-regular fa-paper-plane side-bar-tool"></i>Sent</article>
            <article className='mail-filter'><i class="fa-regular fa-clipboard side-bar-tool"></i>Drafts</article>

        </section>
    )
}