import Meta from '@/components/Meta';
import useOrientation from '@/hooks/useOrientation';
import { styled } from '@mui/material/styles';
import { Container, Box, Grid, TextField, Select, MenuItem, Paper , Button, CircularProgress } from "@mui/material";

import React, {useState} from 'react';
import muiLogo from './logos/mui.svg';
import pwaLogo from './logos/pwa.svg';
import reactLogo from './logos/react_ed.svg';
import recoilLogo from './logos/recoil.svg';
import rrLogo from './logos/rr.svg';
import tsLogo from './logos/ts.svg';
import viteLogo from './logos/vite.svg';
import { Image } from './styled';
import MsgFooter from './msgFooter';
import CardAnswerList from './cardAnswerList';
import {TopicThread, topicThreadDao} from "@/utils/db";

function Welcome() {
  var topicThreads = topicThreadDao.getRecordsLive();
  const isPortrait = useOrientation();
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Meta title="Welcome" />
      <Container maxWidth="md">
        <CardAnswerList topicThreads={topicThreads}/>
        <div style={{ height: '200px' }}></div>
      </Container>
      
      <MsgFooter/>
      
    </>
  );
}

export default Welcome;
