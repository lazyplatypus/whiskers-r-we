import Modal from 'react-modal';
import React, { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
  },
};

Modal.setAppElement('#__next');

export default function CodeSampleModal({ isOpen, closeModal }) {
  
  const [isDancing, setIsDancing] = useState(false);

  const startDancing = () => {
    setIsDancing(true);
  };

  const stopDancing = () => {
    setIsDancing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Code Sample"
    >
      <h1>Dancing Cat</h1>
      <img
        src="https://media1.giphy.com/media/BK1EfIsdkKZMY/200w.gif?cid=6c09b952osm4les9zxbf6087jo85isxpa84vtfz43swsvtbw&rid=200w.gif&ct=g"
        alt="Dancing Cat"
        onMouseEnter={startDancing}
        onMouseLeave={stopDancing}
      />
      {isDancing && (
        <div>
          <p>The cat is dancing!</p>
          <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" autoPlay loop />
        </div>
      )}
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}
