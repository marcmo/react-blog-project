const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
    console.warn(`[${token}] start new session`);
  }
  return data
}

function getByCategory (token, category) {
  console.warn(`[${token}] getByCategory: ${category}`);
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  console.warn(`[${token}] get id:` + id);
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  console.warn(`[${token}] get all`);
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    console.warn(`[${token}] get all (${keys.length} posts)`);
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    console.warn(`[${token}] get all (${filtered_keys.length} posts)`);
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  console.warn(`[${token}] adding post with id ` + post.id);
  console.warn('.......title ' + post.title);
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }
    var keys = [];
    for(var k in posts) keys.push(k);

    console.warn(`[${token}] added post, we now have ${keys.length} items`)

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  console.warn(`[${token}] voting on post id:` + id)
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    console.warn(`[${token}] --> vote is now ` + post.voteScore)
    res(post)
  })
}

function disable (token, id) {
    console.warn(`[token:${token}] setting post to deleted, id:` + id);
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    console.warn(`[${token}] editing post with id:` + id);
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}
