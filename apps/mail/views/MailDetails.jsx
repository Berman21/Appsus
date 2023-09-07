import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }


    if (!mail) return <div>Loading...</div>
    return (
        <React.Fragment>
            <section className='mail-controls'>
                <i className="fa-solid fa-arrow-left" onClick={onBack}></i>
                <i className="fa-solid fa-box-archive"></i>
                <i className="fa-regular fa-trash-can"></i>
                <i className="fa-regular fa-envelope"></i>
                <i className="fa-regular fa-envelope-open"></i>
                <i className="fa-solid fa-chevron-left"></i>
                <span>num out of total</span>
                <i className="fa-solid fa-chevron-right"></i>
            </section>

            <section className='mail-subject'>
                <span>{mail.subject}</span>
                <article>mail label</article>
                <article><i className="fa-solid fa-xmark"></i></article>
            </section>

            <section className='mail-info'>
                <span>{mail.from}</span>
                <span>time data</span>
                <span><i className="fa-regular fa-star"></i></span>
            </section>

            <section className='mail-body'>
                <p>{mail.body}</p>
            </section>
        </React.Fragment>
    )
}