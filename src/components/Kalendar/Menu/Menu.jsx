import React, { useEffect, useState } from 'react';
import './style.css';

const Menu = () => {
  const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);

    return [playing, toggle];
  };

  const Player = ({ url }) => {
    return (
      <div>
        <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
      </div>
    );
  };

  const [playing, toggle] = useAudio('http://sfxcontent.s3.amazonaws.com/soundfx/Knife-Slice.mp3');
  return (
    <div>
      <div className="navigation">
        <input type="checkbox" className="navigation_checkbox" id="navi-toggle" />
        <label htmlFor="navi-toggle" className="navigation_button">
          <span className="navigation_icon" />
        </label>
        <div className="navigation_background">&nbsp;</div>
        <nav className="navigation_nav">
          <ul className="navigation_list">
            <li className="navigation_item">
              <a href="#" onMouseEnter="playAudio()" className="navigation_link">
                <span>JAN</span>FEB
              </a>
            </li>
            <li className="navigation_item">
              <a href="#" onMouseEnter={playing} className="navigation_link">
                <span>MAR</span>APR
              </a>
            </li>
            <li className="navigation_item">
              <a href="#" onMouseEnter={playing} className="navigation_link">
                <span>MAY</span>JUN
              </a>
            </li>
            <li className="navigation_item">
              <a href="#" onMouseEnter={playing} className="navigation_link">
                <span>JUL</span>AUG
              </a>
            </li>
            <li className="navigation_item">
              <a href="#" onMouseEnter={playing} className="navigation_link">
                <span>SEP</span>OCT
              </a>
            </li>
            <li className="navigation_item">
              <a href="#" onMouseEnter={playing} className="navigation_link">
                <span>NOV</span>DEC
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
