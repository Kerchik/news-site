import axios from 'axios'

export default {
    async getCookie() {
        await axios.get('/sanctum/csrf-cookie')
    },
    async logout() {
        await this.getCookie()
        await axios.post('/api/logout')
    },
    async login(form) {
        await this.getCookie()
        let result = await axios.post('/api/login', form)
        return result
    },
    async register(form) {
        await this.getCookie()
        await axios.post('/api/register', form)
    },
    async editArticle(form, id) {
        await this.getCookie()
        await axios.post(`/api/news/${id}`, form)
    },
    async deleteArticle(id) {
        await this.getCookie()
        await axios.delete(`/api/news/remove/${id}`)
    },
    async addArticle(form) {
        await this.getCookie()
        await axios.post(`/api/add-news`, form)
    },
    async addComment(form, id) {
        await this.getCookie()
        await axios.post(`/api/add-comment/${id}`, form)
    },
    async getComments(id) {
        await this.getCookie()
        return await axios.get(`/api/get-comments/${id}`)
    },
    async changeUserRole(form, id) {
        await this.getCookie()
        await axios.post(`/api/change-user-role/${id}`, form)
    },
    async deleteUser(id) {
        await this.getCookie()
        await axios.delete(`/api/delete-user/${id}`)
    },
    async changeUserData(form, id) {
        await this.getCookie()
        await axios.post(`/api/user/${id}`, form)
    },
    async changePassword(form, id) {
        await this.getCookie()
        await axios.post(`/api/user/${id}/password-change`, form)
    }
}