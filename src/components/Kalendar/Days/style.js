import styled from 'styled-components';

const AgencyTitle = styled.p`
  color: aqua;
  font-size: large;
  font-weight: bold;
  margin-bottom: 4px;
  padding: 0;
  text-align: center;
`;

const Weekday = styled.h3`
  margin-bottom: 16px;
`;

const DateInfo = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const NumberOfDay = styled.h1`
  font-size: 100px;
  margin: 0;
`;

const AgencySection = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default { NumberOfDay, DateInfo, Weekday, AgencyTitle, AgencySection };
