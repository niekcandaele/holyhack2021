import { FC } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Header, Navbar } from '../components';

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color:#e8edf5;
`;
const ContentContainer = styled(motion.div)`
  background-color:#e8edf5;
  width: 100%;
  opacity: 0;
  overflow-y: auto;
`;
const Page = styled.div`
  padding: 30px 80px;
`;

export const Frame: FC = () => {
  return (
    <Container>
      <Navbar />
      <ContentContainer
        animate={{ opacity: 1 }}
        transition={{ delay: .3, duration: .5 }}
      >
        <Header />
        <Page>
          <Outlet />
        </Page>
      </ContentContainer>
    </Container>
  );
};
