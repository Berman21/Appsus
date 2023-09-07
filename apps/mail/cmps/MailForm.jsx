import { mailService } from "../services/mail.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailForm() {

    const [mailToSend, setMailToSend] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.mailId) loadMail()
    }, [])

    function loadMail() {
        mailService
            .get(params.mailId)
            .then(setMailToSend)
            .catch(err => console.log('err:', err))
    }



    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === 'categories' || field === 'authors') value = [value]

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        setMailToSend(prevMailToSend => ({ ...prevMailToSend, [field]: value }))
    }

    function onSubmitMail(ev) {
        ev.preventDefault()

        mailService
            .save(mailToSend)
            .then(()=>{
                showSuccessMsg('Mail sent successfully')
                navigate('/mail')
            })
            .catch(err => {
                console.log('err',err)
                showErrorMsg('Couldent send mail')
            })
    }

    return (
        <section>

            <article>
                <h3>New mail</h3>
            </article>

            <form onSubmit={onSubmitMail}>
                <article>
                    <input value={mailToSend.to} onChange={handleChange} type="text" placeholder='To' id='to' name='to' />
                </article>

                <article>
                    <input value={mailToSend.subject} onChange={handleChange} type="text" placeholder='Subject' id='subject' name='subject' />
                </article>

                <article>
                    <input value={mailToSend.body} onChange={handleChange} type="text" id='body' name='body' />
                </article>

                <button>Send</button>
            </form>

        </section>
    )
}
