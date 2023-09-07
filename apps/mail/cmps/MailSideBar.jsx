const { Link } = ReactRouterDOM

export function MailSideBar() {
  
    return (
        <section className='mail-side-bar'>
            <button><Link to={`/mail/compose`}>Compose</Link></button>
            <article>Inbox</article>
            <article>Starred</article>
            <article>Sent</article>
            <article>Drafts</article>

        </section>
    )
}