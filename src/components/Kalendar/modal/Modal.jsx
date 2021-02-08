import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentDayLaunches,
  getCurrentMonthLaunches,
  getSlideIndex,
  getToday,
  isModalShown,
} from '../../../store';
import { toggleModal } from '../../../store/actions';
import s from '../DaysCarousel/style';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: {
    y: '100px',
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const BackdropCSS = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
`;

const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalCSS = styled(motion.div)`
  background: white;
  color: black;
  position: absolute;
  top: 50%;
  border-radius: 6px;
  width: 500px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Operator Mono Book Italic', sans-serif !important;
  padding: 16px;
  list-style-type: none;
  text-decoration: none;
  button {
    color: white;
    padding: 10px 30px;
    font-size: 1em;
    border: 3px solid white;
    margin-top: 16px;
  }
  h2 {
    background: #00aaff;
    font-size: 2em;
    margin-bottom: 30px;
  }
  h3 {
    color: white;
  }
  ul {
    margin-top: 16px;
  }
`;

const Modal = () => {
  const isModalHidden = useSelector(isModalShown);
  const currentDayLaunches = useSelector(getCurrentDayLaunches);
  const day = useSelector(getSlideIndex);
  const dispatch = useDispatch();
  const toggle = () => dispatch(toggleModal(!isModalHidden));

  console.log(`THIS ODAY`, currentDayLaunches && currentDayLaunches);
  return (
    <AnimatePresence>
      {!isModalHidden && (
        <BackdropCSS
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={toggle}
        >
          <ModalContainer variants={modal}>
            <ModalCSS variants={modal}>
              <div>
                {day + 1} WEEKDAY
                <div>agency</div>
                <div>launch info</div>
                <div>timer</div>
              </div>
            </ModalCSS>
          </ModalContainer>
        </BackdropCSS>
      )}
    </AnimatePresence>
  );
};

export default Modal;
