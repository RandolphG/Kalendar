import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
`;

const Content = styled.div`
  box-sizing: border-box;
  background: transparent;
  width: 100vw;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  overflow: hidden;
  background: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.p`
  width: fit-content;
`;

const Agency = styled.p`
  background: #26547c;
  width: fit-content;
`;

const Header = styled.div`
  padding: 0 1rem;
  font-size: x-large;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 90px;
  top: 0;
  left: 0;
  background-color: rgba(22, 22, 22, 0.4);
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    position: absolute;
    border: none;
    color: white;
    font-size: 4rem;
    width: 5rem;
    height: 1px;
    transition: opacity 0.3s;
    opacity: 0.5;
    z-index: 4;
    top: 0%;
    &:first-child {
      left: 0%;
    }
    &:last-child {
      right: 0%;
    }
  }
`;
export default { Agency, Title, Row, Content, Container, Header };
