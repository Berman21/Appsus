import { utilService } from "../../../services/util.service.js"
import { storageServiceSync } from "../../../services/storage.service.js";
import { storageService } from '../../../services/async-storage.service.js'

console.log('this is from mail service');

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }

            if (filterBy.minSpeed) {
                cars = cars.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        // .then(mail => {
        //     mail = _setNextPrevCarId(car)
        //     return mail
        // })
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = '', isRead = '', sentAt = '', removedAt = '', from = '', to = '') {
    return { subject, body, isRead, sentAt, removedAt, from, to }
}

function getDefaultFilter() {
    return { txt: '', isRead: '' }
}

function _createMail(subject, body, isRead, sentAt, removedAt, from, to) {
    const mail = getEmptyMail(subject, body, isRead, sentAt, removedAt, from, to)
    mail.id = utilService.makeId()
    return mail
}

function _createMails() {
    let mails = storageServiceSync.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Helmet Discount', 'Summer Sale imcoming! get great discounts for all the new designs! sale end by the end of the month!', false, 'May 5', '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('New Motorcycle', 'Uncover the new Kawasaki model coming in next month!', false, 'May 5', '', 'ads@Kawsaki.com', loggedinUser.email))
        mails.push(_createMail('Gym Membership', 'Dear member, your membership is ending n few days, please renew it', false, 'March 20', '', 'GymBros@gmail.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'Hi..regarding your last commit, there are more bugs in your code than bugs on earth!', false, 'Feb 10', '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('reptile accessories', 'Aint your danger noodle bored in the enclosure? time to do some renovation!', false, 'May 5', '', 'sankes4us@yahoo.com', loggedinUser.email))
        mails.push(_createMail('Parents pressure', 'we got a lot of compalins from your family about not propsing yet..feel pressured yet?', false, 'May 5', '', 'rings@someMail.com', loggedinUser.email))
        mails.push(_createMail('motor insurance', 'Hey there! jsut wanted to notify you that your wrecked motorcycle belongs to the trash!', false, 'March 20', '', 'motor@insurance.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'just a reminder to fix those damn bugs in your code..', false, 'sep 10', '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('Gov Taxes', 'we remind you that 25% of your Stocks profits go to taxes lmao', false, 'sep 10', '', 'taxes@gov.com', loggedinUser.email))
        storageServiceSync.saveToStorage(MAIL_KEY, mails)
    }
}