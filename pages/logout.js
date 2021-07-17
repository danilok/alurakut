import React from 'react';
import nookies from 'nookies'
import { useRouter } from 'next/router'
import styled from 'styled-components';

const Message = styled.p`
  color: ${({ theme }) => theme.colors.title};
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

export default function LogoutPage() {
  const router = useRouter()
  // https://dev.to/otamnitram/react-useeffect-cleanup-how-and-when-to-use-it-2hbm
  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      nookies.destroy(null, 'USER_TOKEN')
      router.push('/')
    }
    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <Message>
        Deslogando...
      </Message>
    </>
  )
}
