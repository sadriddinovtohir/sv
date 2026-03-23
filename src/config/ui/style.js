import styled from "@emotion/styled";

export const Roundedspan = styled.div`
  border: 1px solid;
  padding: 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(100px);
  background: rgba(135, 57, 57, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;

  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;
