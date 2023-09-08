import { MailPreview } from "./MailPreview.jsx"
const { Link, useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onSaveMail,onToggleRead }) {

    const navigate = useNavigate()

    function handleClick(ev, mail) {
        ev.stopPropagation()
        openMail(mail)
        console.log('from open');
    }

    function openMail(mail) {
        mail.isRead = true
        onSaveMail(mail)
        navigate(`/mail/${mail.id}`)
    }

    

    return (
        <section className='mail-list'>
            <article>
                <button>Primary</button>
                <button>Read</button>
                <button>Unread</button>
            </article>
            <table>
                <tbody>
                    {mails.map(mail =>
                        <tr className="mail-preview" key={mail.id} onClick={(event) => handleClick(event,mail)}>
                            <MailPreview mail={mail} onRemoveMail={onRemoveMail} onToggleRead={onToggleRead} />
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}
