import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(to bottom right, #7f3737, #2a2122);
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
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  overflow: hidden;
  border: darkslateblue 3px solid;
  background: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.p`
  background: #ef476f;
  width: fit-content;
`;

const Agency = styled.p`
  background: #26547c;
  width: fit-content;
`;

const style = { Agency, Title, Row, Content, Container };
export default style;
