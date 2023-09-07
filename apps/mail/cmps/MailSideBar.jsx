const { Link } = ReactRouterDOM

export function MailSideBar() {

    return (
        <section className='mail-side-bar'>
            <button><Link to={`/mail/compose`}><i class="fa-solid fa-pencil side-bar-tool"></i>Compose</Link></button>
            <article><i class="fa-solid fa-inbox side-bar-tool"></i>Inbox</article>
            <article><i className="fa-regular fa-star side-bar-tool"></i>Starred</article>
            <article><i class="fa-regular fa-paper-plane side-bar-tool"></i>Sent</article>
            <article><i class="fa-regular fa-clipboard side-bar-tool"></i>Drafts</article>

        </section>
    )
}