import styled from 'styled-components';

const Message = styled.p`
  color: ${({ theme }) => theme.colors.title};
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

export default Message;