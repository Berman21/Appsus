const { Link, NavLink, useNavigate } = ReactRouterDOM
import { utilService } from "../../../services/util.service.js";

export function MailPreview({ mail, onRemoveMail, onToggleRead }) {

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

    
    function getMonth(date) {
        if(Date.now() - date >= 1000*60**2*24*365) return
        let month = new Date(date)
        month = utilService.getMonthName(month)
        month = month.slice(0,3)
        return month
    }

    function getDate(date) {
        const year = 1000*60**2*24*365
        if(Date.now() - date >= year) return new Intl.DateTimeFormat('he-IL').format(date)
        let dateInMonth = new Date(date)
        dateInMonth = dateInMonth.getDate()
        return dateInMonth
    }

    return (
        <React.Fragment>
            <td title='star the message'><i className="fa-regular fa-star" ></i></td>
            <td><span className='mail-preview-from'>{mail.from}</span></td>
            <td><div><span className='mail-preview-subject'>{mail.subject}</span><span> - </span><span className='mail-preview-body'>{mail.body}</span></div></td>
            <td><span>{getMonth(mail.sentAt)} </span><span>{getDate(mail.sentAt)}</span></td>
            <td onClick={(event) => handleClick(event, mail.id)} ><i className="fa-regular fa-trash-can"></i></td>
            {mail.isRead === false && <td title='manual mark as read/unread' onClick={(event) => toggleRead(event, mail)}><i className="fa-regular fa-envelope"></i></td>}
            {mail.isRead && <td title='manual mark as read/unread' onClick={(event) => toggleRead(event, mail)}><i className="fa-regular fa-envelope-open"></i></td>}
        </React.Fragment>
    )
}