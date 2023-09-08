const { Link, NavLink, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail,onToggleRead }) {

    function handleClick(ev, mailId) {
        ev.stopPropagation()
        console.log('from remove');
        onRemoveMail(mailId)
    }

    function toggleRead(ev, mail) {
        ev.stopPropagation()
        onToggleRead(mail)
        console.log('from toggle');
    }

    return (
        <React.Fragment>
            <td><i className="fa-regular fa-star"></i></td>
            <td>{mail.from}</td>
            <td><div>{mail.subject}<span>-</span><span>{mail.body}</span></div></td>
            {/* <td>{mail.body}</td> */}
            <td>{mail.sentAt}</td>
            <td onClick={(event) => handleClick(event, mail.id)} ><i className="fa-regular fa-trash-can"></i></td>
            {mail.isRead === false && <td onClick={(event) => toggleRead(event, mail)}><i className="fa-regular fa-envelope"></i></td>}
            {mail.isRead && <td onClick={(event) => toggleRead(event, mail)}><i className="fa-regular fa-envelope-open"></i></td>}
        </React.Fragment>
    )
}