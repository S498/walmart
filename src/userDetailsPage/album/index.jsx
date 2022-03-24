import React from "react";
import "./styles.css";
import { useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";

function UserAlbum({album}) {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getAlbumPhotos = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`
      )
        .then((response) => response.json())
        .then((json) => setPhotos(json));
    };
    getAlbumPhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="album">
      <div
        className="show-photos"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <h3 className="album-title">{album.title}</h3>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text" className="photos-container">
          {photos.map((photo) => (
            <div className="photo" key={photo.id}>
              <div className="photo-title">
                <h5>{photo.title}</h5>
              </div>
              <div className="photo-img">
                <a href={photo.url} rel="noreferrer" target="_blank">
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

export default UserAlbum;
