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
  margin: 0;
`;

const DateInfo = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const NumberOfDay = styled.h1`
  margin-right: 16px;
`;

const AgencySection = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default { NumberOfDay, DateInfo, Weekday, AgencyTitle, AgencySection };
