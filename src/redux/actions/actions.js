/** */
import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : `http://localhost:${process.env.REACT_APP_API_PORT}/api/`
export function loadArticles () {
    return (dispatch) => {
        return axios.get(`${url}articles`)
        .then((res) => {
            let articles = res.data
            dispatch({type:'LOAD_ARTICLES', articles})
            return articles
        })
    }
}
export function getUser (id) {
    return axios.get(`${url}user/${id}`).then((res)=>{
        return res.data
    }).catch(err=>console.error(err))
}
export function getUserProfile (id) {
    return (dispatch) => {
        return axios.get(`${url}user/profile/${id}`).then((res)=>{
            let profile = res.data
            dispatch({type: 'SET_PROFILE', profile})
        }).catch(err=>console.error(err))
    }
}
export function getArticle (article_id) {
    return (dispatch) => {
        return axios.get(`${url}article/${article_id}`)
        .then((res) => {
            let article = res.data
            dispatch({type: 'VIEW_ARTICLE', article})
        }).catch((err) => console.error(err))
    }
}
// article_id, author_id, comment
export function comment (article_id, author_id, comment) {
    return (dispatch) => {
        return axios.post(`${url}article/comment`,{ article_id, author_id, comment }).then((res) => {
            dispatch({type:'ADD_COMMENT', comment: res.data})
            return res.data
        })
    }
}
//req.body.article_id
export function clap (article_id) {
    return (dispatch) => {
        return axios.post(`${url}article/clap`,{ article_id }).then((res) => {
            dispatch({type:'CLAP_ARTICLE'})
        }).catch((err)=>console.error(err))
    }
}
//id, user_id
export function follow (id, user_id) {
    return (dispatch) => {
        return axios.post(`${url}user/follow`,{ id, user_id }).then((res) => {
            dispatch({type:'FOLLOW_USER', user_id})
        }).catch((err)=>console.error(err))
    }
}
export function SignInUser (user_data) {
    return (dispatch) => {
        return axios.post(`${url}user`,user_data).then((res)=>{
            let user = res.data
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'SET_USER', user})
        }).catch((err)=>console.error(err))
    }
}
export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false})
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true})
    }
}
