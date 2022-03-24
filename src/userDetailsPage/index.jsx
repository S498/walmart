import React from 'react';
import './styles.css';
import { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';
import { BsTelephoneFill, BsGlobe } from 'react-icons/bs';

function UserDetailsPage() {

  const [user, setUser] = useState([]);

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

  return (
    <div>
      <Row>
        <Col md={3}>
          <Card className="user-card" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <FaUser className="user-icon" />
                {user.username}
              </Card.Subtitle>
              <Card.Text>
                <div className="user-email">
                  <GoMail />
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
                <div className="user-phone">
                  <BsTelephoneFill />
                  {user.phone}
                </div>
                <div className="user-website">
                  <BsGlobe />
                  <a href={user.website} rel="noreferrer" target="_blank">
                    {user.website}
                  </a>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserDetailsPage;
