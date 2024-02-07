import { getPosts } from './scripts/getPosts.js'

window.addEventListener('DOMContentLoaded', () => {
  const postsList = document.querySelector('#posts')

  const createArticleElement = ({ body, title }) =>
    `
      <article>
        <h2>${title}</h2>
        <p>${body}</p>
      </article>
    `

  const addPostToList = (data) => {
    if (postsList && data) {
      data.forEach((post) => {
        postsList.innerHTML += createArticleElement(post)
      })
    }
  }

  getPosts().then((posts) => {
    
    addPostToList(posts)
  })
})
