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
    sortBy,
}

function sortBy(sortBy,mails){
    console.log('sort by is',sortBy);
        if(sortBy.sentAt !== undefined){
            mails.sort((mail1,mail2) => (mail1.sentAt - mail2.sentAt)*sortBy.sentAt)
        }
        return mails
}



function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {            
            if (filterBy.isRead === null) {
                console.log('get all mails');
                mails = mails.filter(mail => mail)
            }
            else if (filterBy.isRead) {
                console.log('get read mails');
                mails = mails.filter(mail => mail.isRead)
            }
            else if (!filterBy.isRead) {
                console.log('get unread mails');
                mails = mails.filter(mail => !mail.isRead)
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
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
    console.log('removed', mailId);
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
    return { txt: '', isRead: null }
}

function _createMail(subject, body, isRead, sentAt, removedAt, from, to) {
    const mail = getEmptyMail(subject, body, isRead, sentAt, removedAt, from, to)
    mail.id = utilService.makeId()
    return mail
}

randomDate()
function randomDate(start=new Date(2020, 0, 1), end= new Date(), startHour=0, endHour=24) {
    var date = new Date(+start + Math.random() * (end - start));
    date = date[Symbol.toPrimitive]('number')
    return date
  }


function _createMails() {
    let mails = storageServiceSync.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Helmet Discount', 'Summer Sale imcoming! get great discounts for all the new designs! sale end by the end of the month!', false, randomDate(), '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('New Motorcycle', 'Uncover the new Kawasaki model coming in next month!', false, randomDate(), '', 'ads@Kawsaki.com', loggedinUser.email))
        mails.push(_createMail('Gym Membership', 'Dear member, your membership is ending n few days, please renew it', false, randomDate(), '', 'GymBros@gmail.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'Hi..regarding your last commit, there are more bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('reptile accessories', 'Aint your danger noodle bored in the enclosure? time to do some renovation!', false, randomDate(), '', 'sankes4us@yahoo.com', loggedinUser.email))
        mails.push(_createMail('motor insurance', 'Hey there! jsut wanted to notify you that your wrecked motorcycle belongs to the trash Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, dolore quisquam! Ut, dolore reprehenderit laboriosam doloribus consequatur eos nulla, fuga natus cum cupiditate qui dolores ea obcaecati mollitia dolor quia', false, randomDate(), '', 'motor@insurance.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'just a reminder to fix those damn bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('Gov Taxes', 'we remind you that 25% of your Stocks profits go to taxes lmao', false, randomDate(), '', 'taxes@gov.com', loggedinUser.email))
        mails.push(_createMail('Helmet Discount', 'Summer Sale imcoming! get great discounts for all the new designs! sale end by the end of the month!', false, randomDate(), '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('New Motorcycle', 'Uncover the new Kawasaki model Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, dolore quisquam! Ut, dolore reprehenderit laboriosam doloribus consequatur eos nulla, fuga natus cum cupiditate qui dolores ea obcaecati mollitia dolor quia.        coming in next month!', false, randomDate(), '', 'ads@Kawsaki.com', loggedinUser.email))
        mails.push(_createMail('Gym Membership', 'Dear member, your membership is ending n few days, please renew it', false, randomDate(), '', 'GymBros@gmail.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'Hi..regarding your last commit, there are more bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('reptile accessories', 'Aint your danger noodle bored in the enclosure? time to do some renovation!', false, randomDate(), '', 'sankes4us@yahoo.com', loggedinUser.email))
        mails.push(_createMail('motor insurance', 'Hey there! jsut wanted to notify you that your wrecked motorcycle belongs to the trash!', false, randomDate(), '', 'motor@insurance.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'just a reminder to fix those damn bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('Gov Taxes', 'we remind you that 25% of your Stocks profits go to taxes lmao', false, randomDate(), '', 'taxes@gov.com', loggedinUser.email))
        mails.push(_createMail('Helmet Discount', 'Summer Sale imcoming! get great discounts for all the new designs! sale end by the end of the month!', false, randomDate(), '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('New Motorcycle', 'Uncover the new Kawasaki model coming in next month!', false, randomDate(), '', 'ads@Kawsaki.com', loggedinUser.email))
        mails.push(_createMail('Gym Membership', 'Dear member, your membership is ending n few days, please renew it', false, randomDate(), '', 'GymBros@gmail.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'Hi..regarding your last commit, there are more bugs in your code...', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('reptile accessories', 'Aint your danger noodle bored in the enclosure? time to do some renovationLorem ipsum dolor sit amet consectetur adipisicing elit. Enim, dolore quisquam! Ut, dolore reprehenderit laboriosam doloribus consequatur eos nulla, fuga natus cum cupiditate qui dolores ea obcaecati mollitia dolor quia.        !', false, randomDate(), '', 'sankes4us@yahoo.com', loggedinUser.email))
        mails.push(_createMail('motor insurance', 'Hey there! jsut wanted to notify you that your wrecked motorcycle belongs to the trash!', false, randomDate(), '', 'motor@insurance.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'just a reminder to fix those damn bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('Gov Taxes', 'we remind you that 25% of your Stocks profits go to taxes lmao', false, randomDate(), '', 'taxes@gov.com', loggedinUser.email))
        mails.push(_createMail('Helmet Discount', 'Summer Sale imcoming! get great discounts for all the new designs! sale end by the end of the month!', false, randomDate(), '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('New Motorcycle', 'Uncover the new Kawasaki model coming in next month!', false, randomDate(), '', 'ads@Kawsaki.com', loggedinUser.email))
        mails.push(_createMail('Gym Membership', 'Dear member, your membership is ending n few days, please renew it', false, randomDate(), '', 'GymBros@gmail.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'Hi..regarding your last commit, there are more bugs in your code...', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('reptile accessories', 'Aint your danger noodle bored in the enclosure? time to do some renovation!', false, randomDate(), '', 'sankes4us@yahoo.com', loggedinUser.email))
        mails.push(_createMail('motor insurance', 'Hey there! jsut wanted to notify you that your wrecked motorcycle belongs to the trash!', false, randomDate(), '', 'motor@insurance.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'just a reminder to fix those damn bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('Gov Taxes', 'we remind you that 25% of your Stocks profits go to taxes lmao', false, randomDate(), '', 'taxes@gov.com', loggedinUser.email))
        mails.push(_createMail('Helmet Discount', 'Summer Sale imcoming! get great discounts for all the new designs! sale end by the end of the month!', false, randomDate(), '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('New Motorcycle', 'Uncover the new Kawasaki model coming in next month!', false, randomDate(), '', 'ads@Kawsaki.com', loggedinUser.email))
        mails.push(_createMail('Gym Membership', 'Dear member, your membership is ending n few days, please renew it Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, dolore quisquam! Ut, dolore reprehenderit laboriosam doloribus consequatur eos nulla, fuga natus cum cupiditate qui dolores ea obcaecati mollitia dolor quia.        ', false, randomDate(), '', 'GymBros@gmail.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'Hi..regarding your last commit, there are more bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('reptile accessories', 'Aint your danger noodle bored in the enclosure? time to do some renovation!', false, randomDate(), '', 'sankes4us@yahoo.com', loggedinUser.email))
        mails.push(_createMail('motor insurance', 'Hey there! jsut wanted to notify you that your wrecked motorcycle belongs to the trash!', false, randomDate(), '', 'motor@insurance.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'just a reminder to fix those damn bugs in your code..', false,randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('Gov Taxes', 'we remind you that 25% of your Stocks profits go to taxes lmao', false, randomDate(), '', 'taxes@gov.com', loggedinUser.email))
        mails.push(_createMail('Helmet Discount', 'Summer Sale imcoming! get great discounts for all the new designs! sale end by the end of the month!', false, randomDate(), '', 'sale@ruroc.com', loggedinUser.email))
        mails.push(_createMail('New Motorcycle', 'Uncover the new Kawasaki model coming in next month!', false, randomDate(), '', 'ads@Kawsaki.com', loggedinUser.email))
        mails.push(_createMail('Gym Membership', 'Dear member, your membership is ending n few days, please renew it', false, randomDate(), '', 'GymBros@gmail.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'Hi..regarding your last commit, there are more bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('reptile accessories', 'Aint your danger noodle bored in the enclosure? time to do some renovation!', false, randomDate(), '', 'sankes4us@yahoo.com', loggedinUser.email))
        mails.push(_createMail('motor insurance', 'Hey there! jsut wanted to notify you that your wrecked motorcycle belongs to the trash!', false, randomDate(), '', 'motor@insurance.com', loggedinUser.email))
        mails.push(_createMail('Programming Bootcamp', 'just a reminder to fix those damn bugs in your code..', false, randomDate(), '', 'Bugs4u@bugs.com', loggedinUser.email))
        mails.push(_createMail('Gov Taxes', 'we remind you that 25% of your Stocks profits go to taxes lmao', false, randomDate(), '', 'taxes@gov.com', loggedinUser.email))
        storageServiceSync.saveToStorage(MAIL_KEY, mails)
    }
}