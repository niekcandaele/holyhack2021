import styled from 'styled';

export const Container = styled.div`

`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input <{ hasError: boolean }>`
  width: 100%;
  padding: 20px;
  border-radius: 2rem;
  border: none;
  outline: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ErrorContainer = styled.div<{ showError: boolean }>`
  display: ${({ theme, showError }): string => showError ? 'block' : 'none'};
`;
