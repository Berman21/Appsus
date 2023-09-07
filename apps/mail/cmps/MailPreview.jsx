const { Link, NavLink, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {

    function handleClick(ev, mailId) {
        onRemoveMail(mailId)
        ev.stopPropagation()
    }

    return (
        <React.Fragment>
            <td><i className="fa-regular fa-star"></i></td>
            <td>{mail.from}</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentAt}</td>
            <td onClick={(event) => handleClick(event, mail.id)} ><i className="fa-regular fa-trash-can"></i></td>
            {mail.isRead === false && <td onClick={(event) => toggleRead(event, mail)}><i className="fa-regular fa-envelope"></i></td>}
            {mail.isRead && <td onClick={(event) => toggleRead(event, mail)}><i className="fa-regular fa-envelope-open"></i></td>}
        </React.Fragment>
    )
}