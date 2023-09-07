import { MailPreview } from "./MailPreview.jsx"
const { Link, useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail }) {

    const navigate = useNavigate()

    function navTo(mailId) {
        navigate(`/mail/${mailId}`)
    }

    function onOpenDetails(mailId) {
        console.log(mailId);
    }

    return (
        <table>
            <tbody>
                {mails.map(mail =>
                    <tr className="mail-preview" key={mail.id} onClick={() => navTo(mail.id)}>
                        <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                    </tr>
                )}
            </tbody>
        </table>
    )
}
