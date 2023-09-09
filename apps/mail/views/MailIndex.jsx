import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sort, setSort] = useState({ sentAt: -1 })

    useEffect(() => {
        mailService.query(filterBy)
            .then(mails => setMails(mailService.sortBy(sort, mails)))
            .catch(err => console.log('err:', err))
    }, [filterBy, sort])


    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSetSort(sortMethod, isDesc = false) {
        setSort(prevSort => prevSort = { [sortMethod]: (isDesc) ? -1 : 1 })
    }

    function onSaveMail(mail) {
        mailService.save(mail)
        console.log('hi');
        setMails(prevMails => ({ ...prevMails }))
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail moved to bin ${mailId}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + mailId)
            })
    }

    function onToggleRead(mail) {
        mail.isRead = !mail.isRead
        console.log(mail.isRead);
        onSaveMail(mail)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className='mail-index'>
            <MailFilter searchBar={true} filterBy={filterBy} onSetFilterBy={onSetFilterBy} onSetSort={onSetSort} />
            
            <article className='mail-main-screen flex'>
                <MailFilter searchBar={false} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <MailList mails={mails} onRemoveMail={onRemoveMail} onSaveMail={onSaveMail} onToggleRead={onToggleRead} />
            </article>
            {false && <MailCompose />}
        </section>
    )
}

