import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails,onRemoveMail}) {

    return (
        <table>
            <tbody>
                <MailPreview />
            </tbody>
        </table>
    )
}
