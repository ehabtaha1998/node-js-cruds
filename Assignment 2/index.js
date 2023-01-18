const express = require('express');
const app = express();



// USERS ARRY

const users = [
  {
    id: 1,
    name: 'Ehab',
    gender: 'male',
    age: 30,
    email: 'ehab@gmail.com',
  },
  {
    id: 2,
    name: 'Ali',
    age: 28,
    gender: 'male',
    email: 'ali@gmail.com',
  },
];


//  USERS END POINTS
 
// 01. Get all users
app.get('/users', (req, res) => {
  res.json(users)
})

// 02. add user
app.post('/users/add', express.json(), (req, res) => {
  const { id, name } = req.body
  const userIdx = users.findIndex((el) => el.id === id)
  if (userIdx < 0) {
    if (name) {
      users.push(req.body)
      res.json({ message: 'USER ADDED....' })
    } else {
      res.json({ error: 'USER NAME IS REQUIRED' })
    }
  } else {
    res.json({ error: 'NEW USERS SHOULD HAVE UNIQUE ID' })
  }
})

// 03. Sort users by name
app.get('/users/sorted', (req, res) => {
  res.json([...users].sort((a, b) => (a.name < b.name ? -1 : 1)))
})

// 04. delete user
app.delete('/users/delete', express.json(), (req, res) => {
  const userIdx = users.findIndex((el) => el.id === req.body.id)
  if (userIdx < 0) {
    res.json({ error: 'USER CANNOT BE FOUND' })
  } else {
    users.splice(userIdx, 1)
    res.json({ message: 'USER DELETED....' })
  }
})

// 05. update user
app.put('/users/update', express.json(), (req, res) => {
  const userIdx = users.findIndex((el) => el.id === req.body.id)
  if (userIdx < 0) {
    res.json({ error: 'USER CANNOT BE FOUND' })
  } else {
    const reqBody = Object.entries(req.body)
    if (reqBody.length > 1) {
      reqBody.forEach((el) => (users[userIdx][el[0]] = el[1]))
      res.json({ message: 'USER Updated....' })
    } else {
      res.json({ error: 'UPDATES ARE NOT PROVIDED' })
    }
  }
})

// 06. search users by id
app.post('/users/search', express.json(), (req, res) => {
  const userIdx = users.findIndex((el) => el.id === req.body.id)
  if (userIdx < 0) {
    res.json({ error: 'USER CANNOT BE FOUND' });
  } else {
    res.json(users[userIdx]);
  }
})

app.get('/users/:id', (req, res) => {
  console.log(req.params)
  const userIdx = users.findIndex((el) => el.id === +req.params.id)
  if (userIdx < 0) {
    res.json({ error: 'USER OR PAGE CANNOT BE FOUND' });
  } else {
    res.json(users[userIdx])
  }
})

// POSTS ARRY

const posts = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit.',
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo itaque quaerat nihil velit enim temporibus fuga ab, consequuntur fugiat assumenda omnis ipsum non ipsa provident alias amet, sapiente quae unde?",
    userId: 9,
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit.',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim sint, repudiandae, qui earum iusto blanditiis ratione at quo rem animi ad tenetur? Incidunt quaerat itaque consequuntur earum velit eius voluptatum!',
    userId: 13,
  },
];
// POST END POINTS


// 01. get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 02. add post
app.post('/posts/add', express.json(), (req, res) => {
  const { id, title, body } = req.body
  const postIdx = posts.findIndex((el) => el.id === id)
  if (postIdx < 0) {
    if (title && body) {
      posts.push(req.body)
      res.json({ message: 'POST ADDED....' });
    } else {
      res.json({ error: 'POST TITLE AND BODY ARE REQUIRED' })
    }
  } else {
    res.json({ error: 'CANNOT ADD POST WITH DUPLICATE ID' })
  }
})

// 03. get all posts in reversed order
app.get('/posts/reversed', (req, res) => {
  res.json([...posts].reverse());
})

// 04. delete post
app.delete('/posts/delete', express.json(), (req, res) => {
  const postIdx = posts.findIndex((el) => el.id === req.body.id)
  if (postIdx < 0) {
    res.json({ error: 'POST CANNOT BE FOUND' })
  } else {
    posts.splice(postIdx, 1);
    res.json({ message: 'POST DELETED....' })
  }
});

// 05. update post
app.put('/posts/update', express.json(), (req, res) => {
  const postIdx = posts.findIndex((el) => el.id === req.body.id)
  if (postIdx < 0) {
    res.json({ error: 'POST CANNOT BE FOUND' })
  } else {
    const reqBody = Object.entries(req.body)
    if (reqBody.length > 1) {
      reqBody.forEach((el) => (posts[postIdx][el[0]] = el[1]));
      res.json({ message: 'POST Updated....' })
    } else {
      res.json({ error: 'UPDATES ARE NOT PROVIDED' })
    }
  }
})

// 06. search posts by id
app.post('/posts/search', express.json(), (req, res) => {
  const postIdx = posts.findIndex((el) => el.id === req.body.id)
  if (postIdx < 0) {
    res.json({ error: 'POST CANNOT BE FOUND' })
  } else {
    res.json(posts[postIdx])
  }
});
app.get('/posts/:id', (req, res) => {
  console.log(req.params)
  const postIdx = posts.findIndex((el) => el.id === +req.params.id)
  if (postIdx < 0) {
    res.json({ error: 'POST CANNOT BE FOUND' })
  } else {
    res.json(posts[postIdx])
  }
});

// ERROR 404
 
app.get('*', (req, res) => {
  res.status(404).json({ message: 'ERORR 404 THIS PAGE NOT FOUND.....' })
})

app.listen(5000, () => {
  console.log('I`m live :)')
})