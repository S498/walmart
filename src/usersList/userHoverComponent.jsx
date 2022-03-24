import { React, useState } from 'react';
import './styles.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { GoMail } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';

function UserHoverComponent({ user }) {
  const [onNameHover, setOnNameHover] = useState(false);
  const handleOnMouseEnter = () => {
    setOnNameHover(true);
  };
  const handleOnMouseLeave = () => {
    setOnNameHover(false);
  };

  return (
    <div>
      <OverlayTrigger
        show={onNameHover} // Control trigger behavior with onNameHover variable instead of trigger.
        placement="right"
        overlay={
          <Popover
            id={`popover-positioned-right`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <Popover.Header as="h3">
              <FaUserCircle className="iconUser" />
              {user.username}
            </Popover.Header>
            <Popover.Body>
              <GoMail className="iconMail" />
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </Popover.Body>
          </Popover>
        }
      >
        <div
          className="username"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <Nav.Link href={`/${btoa(user.id)}`}>{user.name}</Nav.Link>
        </div>
      </OverlayTrigger>
    </div>
  );
}

export default UserHoverComponent;
