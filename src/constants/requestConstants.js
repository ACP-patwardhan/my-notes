export const host = 'http://localhost:5000';
export const endpoints = {
    createUser : '/api/auth/createUser',
    login: '/api/auth/login',
    fetchAllNotes: '/api/notes/fetchAll',
    addANote:'/api/notes/addNote',
    deleteNote: '/api/notes/delete', //add note id after slash
    updateNote: '/api/notes/update', //add note id after slash
}