import styled from "@emotion/styled";

export const HomeHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-top: 12px;
`;

export const UbicationButton = styled.button`
  border: none;
  background-color: white;
  color: #1d704f;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
