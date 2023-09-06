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
                mails = mails.filter(mail => regExp.test(mail.vendor))
            }

            if (filterBy.minSpeed) {
                cars = cars.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevCarId(car)
            return mail
        })
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

const email = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
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
        mails.push(_createMail('New Motorcycle', 'Uncover the new Kawasaki model coming in next month!', false, 'May 5', '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('Gym Membership', 'Dear member, your membership is ending n few days, please renew it', false, 'March 20', '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'Hi..regarding your last commit, there are more bugs in your code than bugs on earth!', false, 'Feb 10', '', 'sale@ruroc.com', loggedinUser.email))
        storageServiceSync.saveToStorage(MAIL_KEY, mails)
    }
}