import styled from "@emotion/styled";

export const ChildrenContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -10px;
`;

export const InputFieldInput = styled.input`
  border: none;
  display: flex;
  width: calc(100% - 4em);
  border: none;
  outline: none;
  padding: 0.2em;
  font-size: 1em;

  ::placeholder {
    color: #302f2f;
    padding: 1px;
    font-size: 1em !important;
    text-transform: capitalize;
  }
`;

export const FieldContainer = styled.div<{ height?: number }>`
  background: #fff;
  width: 100%;
  display: flex;
  border: 1px solid #cfcfcf99;
  padding: 0.8em;
  border-radius: 1.7em;
  box-shadow: 2px 2px 6px 0px rgb(0 0 0 / 8%);
  color: #302f2f;
  min-height: 40px;
  height: ${({ height }) => (height ? `${height}px` : "40px")};
  font-size: ${({ height }) => (height ? `${height * 0.3}px` : "12px")};

  svg {
    width: 2em;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;
