import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail }) {

    return (
        <table>
            <tbody>
                {mails.map(mail =>
                    <tr className ="mail-preview" key={mail.id}>
                        <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                    </tr>
                )}
            </tbody>
        </table>
    )
}
