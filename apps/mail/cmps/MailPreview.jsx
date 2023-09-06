export function MailPreview({ mail, onRemoveMail }) {
    return (
        <React.Fragment>
            <td><i className="fa-regular fa-star"></i></td>
            <td>{mail.from}</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentAt}</td>
            <td><i className="fa-regular fa-trash-can"></i></td>
        </React.Fragment>
    )
}