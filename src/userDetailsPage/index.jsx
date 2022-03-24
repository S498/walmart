import React from 'react';
import './styles.css';
import { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Tabs } from 'react-bootstrap';
import { GoMail } from 'react-icons/go';
import Nav from 'react-bootstrap/Nav';
import {
  BsTelephoneFill,
  BsGlobe,
  BsFillGeoAltFill,
  BsFillBriefcaseFill,
} from 'react-icons/bs';
import UserPost from './post';
import UserAlbum from './album';
import { Tab } from 'bootstrap';
import { TextField } from '@material-ui/core';

function UserDetailsPage() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [inputTextPosts, setInputTextPosts] = useState('');
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // simulate getting user's information from database given the user's username
    const fetchUser = async () => {
      await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => {
          setUser(
            json.find(
              (item) =>
                item.id ===
                parseInt(atob(window.location.pathname.split('/')[1]))
            )
          );
        });
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const getUserPosts = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
      )
        .then((response) => response.json())
        .then((json) => setPosts(json));
    };
    getUserPosts();
  }, [user]);

  useEffect(() => {
    const getUserAlbums = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`
      )
        .then((response) => response.json())
        .then((json) => setAlbums(json));
    };
    getUserAlbums();
  }, [user]);

  let searchHandlerPosts = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputTextPosts(lowerCase);
  };

  const filteredPostsData = posts.filter((el) => {
    if (inputTextPosts === '') {
      return el;
    } else {
      return (
        el.title.toLowerCase().includes(inputTextPosts) ||
        el.body.toLowerCase().includes(inputTextPosts)
      );
    }
  });

  return (
    <div>
      <h3>{`${user ? user.name : ''}'s Profile Page`}</h3>
      <Nav.Link href={`/`} className={'back'}>
        <Button className={'back-button'}>Go to Users List</Button>
      </Nav.Link>
      <Row>
        <Col md={3}>
          <Card className="user-card" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Name: {user.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                User Name{': '}
                {user.username}
              </Card.Subtitle>
              <Card.Text>
                <div className="user-email">
                  <GoMail />
                  {': '}
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
                <div className="user-phone">
                  <BsTelephoneFill />
                  {': '}
                  <a href={`tel:${user.phone}`}>{user.phone}</a>
                </div>
                <div className="user-website">
                  <BsGlobe />
                  {': '}
                  <a
                    href={`https://www.${user.website}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                </div>
                <div className="user-address">
                  <BsFillGeoAltFill />
                  {': '}
                  {user.address && user.address.city}
                </div>
                <div className="user-company">
                  <BsFillBriefcaseFill />
                  {': '}
                  {user.company && user.company.name}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Tabs
            defaultActiveKey="posts"
            className="mb-3"
          >
            <Tab eventKey="posts" title="Posts">
              <div className="search">
                <TextField
                  id="outlined-basic"
                  onChange={searchHandlerPosts}
                  variant="outlined"
                  fullWidth
                  label="Search"
                />
              </div>
              <div className="posts-container">
                {filteredPostsData.map((post) => (
                  <div key={post.id}>
                    <UserPost post={post} />
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey="albums" title="Albums">
              <div className="albums-container">
                {albums.map((album) => (
                  <div key={album.id}>
                    <UserAlbum album={album} />
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default UserDetailsPage;
