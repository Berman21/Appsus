// note service

export const noteService = {
    getNotes,
}

const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d',
            color: '#fff'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    }
]

function getNotes() {
    return notes
}
