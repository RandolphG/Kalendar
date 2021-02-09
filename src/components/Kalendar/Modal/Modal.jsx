import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSlideIndex, isModalShown } from '../../../store';
import { toggleModal } from '../../../store/actions';
import CountDownClock from '../CountDownClock/CountDownClock';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { delay: 0.5 } },
};

const modal = {
  hidden: { y: '-100px', opacity: 0, transition: { delay: 0.6 } },
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
  background: rgba(0, 0, 0, 0.7);
  z-index: 500;
`;

const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalCSS = styled(motion.div)`
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(150, 150, 150, 1) 0%,
    rgba(89, 89, 89, 1) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(150, 150, 150, 1)),
    color-stop(100%, rgba(89, 89, 89, 1))
  );

  background: radial-gradient(
    ellipse at center,
    rgba(150, 150, 150, 1) 0%,
    rgba(89, 89, 89, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#969696', endColorstr = '#595959', GradientType = 1);
  color: black;
  position: absolute;
  top: 50%;
  border-radius: 6px;
  width: 310px;
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
  const day = useSelector(getSlideIndex);
  const dispatch = useDispatch();
  const toggle = () => dispatch(toggleModal(!isModalHidden));

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
              <div style={{ display: 'flex', flexDirection: 'row', background: 'green' }}>
                <CountDownClock />
              </div>
            </ModalCSS>
          </ModalContainer>
        </BackdropCSS>
      )}
    </AnimatePresence>
  );
};

export default Modal;
