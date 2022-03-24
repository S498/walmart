import React from 'react';
import './styles.css';
import { useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';

function UserPost({ post }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [form, setForm] = useState(false);
  const [body, setBody] = useState({
    title: '',
    body: '',
  });
  const [newcomment, setNewComment] = useState('');

  useEffect(() => {
    const getPostComments = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
      )
        .then((response) => response.json())
        .then((json) => setComments(json));
    };
    getPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deletePost() {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: 'DELETE',
    }).then(setDeleted(true));
  }

  async function editPost(e) {
    e.preventDefault();
    console.log('form data:', body);
    await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        id: post.id,
        title: body.title ? body.title : post.title,
        body: body.body ? body.body : post.body,
        userId: post.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('response:', json);
        post.title = json.title;
        post.body = json.body;
        setForm(false);
      });
  }

  function changeHandlerEdit(e) {
    const newBody = { ...body };
    newBody[e.target.id] = e.target.value;
    setBody(newBody);
  }

  async function addComment(e) {
    e.preventDefault();
    console.log('new comment: ', newcomment);
    await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId: post.id,
        name: 'USER',
        email: 'userEmail@email.com',
        body: newcomment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('response: ', json);
        setComments([...comments, json]);
        setNewComment('');
      });
  }

  return (
    <div>
      {deleted ? null : (
        <div className="post">
          <div className="main">
            <div
              className="show-comments"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          </div>
          {form ? (
            <form className="EditForm" onSubmit={(e) => editPost(e)}>
              <label>New Title</label>
              <input
                type="text"
                id="title"
                onChange={(e) => changeHandlerEdit(e)}
              />
              <label>New Body</label>
              <textarea
                id="body"
                onChange={(e) => changeHandlerEdit(e)}
              ></textarea>
              <button type='submit'>Update</button>
              <button onClick={() => setForm(!form)}>Cancel</button>
            </form>
          ) : null}
          <Collapse in={open}>
            <div id="example-collapse-text" className="comments-container">
              <div className="post-controls">
                {!form && (
                  <button onClick={() => setForm(!form)} title={'Edit Post'}>
                    <MdEdit />
                  </button>
                )}
                {!form && (
                  <button
                    onClick={() => deletePost(post.id)}
                    title={'Delete Post'}
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
              {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="commenter">
                    <FaUser />
                    <p style={{ color: 'brown', fontWeight: 'bold' }}>
                      {comment.name}
                    </p>
                  </div>
                  <div className="comment-body">
                    <p>{comment.body}</p>
                  </div>
                </div>
              ))}
              <form className="comment" onSubmit={(e) => addComment(e)}>
                <label>
                  <div className="commenter">
                    <FaUser />
                    <p style={{ color: 'brown', fontWeight: 'bold' }}>User</p>
                  </div>
                </label>
                <textarea
                  className="comment-textarea"
                  id="body"
                  value={newcomment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                ></textarea>
                <button className="comment-button">Post Comment</button>
              </form>
            </div>
          </Collapse>
        </div>
      )}
    </div>
  );
}

export default UserPost;
