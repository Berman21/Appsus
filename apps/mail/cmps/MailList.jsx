import { MailPreview } from "./MailPreview.jsx"
const { Link, useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onSaveMail }) {

    const navigate = useNavigate()

    function openMail(mail) {
        console.log(mails);
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
                        <tr className="mail-preview" key={mail.id} onClick={() => openMail(mail)}>
                            <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}
