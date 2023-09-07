import { MailList } from "../cmps/MailList.jsx"
import { MailSideBar } from "../cmps/MailSideBar.jsx"
import { MailForm } from "../cmps/MailForm.jsx"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }, [filterBy])



    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSaveMail(mail) {
        mailService.save(mail)
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

    if (!mails) return <div>Loading...</div>
    return (
        <section>
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <MailSideBar />
            <MailList mails={mails} onRemoveMail={onRemoveMail} onSaveMail={onSaveMail} />
            <MailForm />
        </section>
    )
}

