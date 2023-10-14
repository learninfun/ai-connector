import Typography from '@mui/material/Typography';

import * as React from 'react';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import Box from '@mui/system/Box/Box';
import { Button, Container, TextField } from '@mui/material';

function PageApiKeys() {
  const [openAiKey, setOpenAiKey] = React.useState('');
  
  function handleClickApiKeySave() {
    localStorage.setItem('ApiKeyOpenAI', openAiKey);
  }

  return (
    <>
      <Meta title="page 1" />
      
      <Container maxWidth="md">
        <h1>API Key</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-controlled"
            label="OpenAI"
            type="password"
            value={openAiKey}            
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setOpenAiKey(event.target.value);              
            }}
          />
        </Box>
        <Button 
          variant="contained" color="primary" id="btnSaveApiKey"
          onClick={handleClickApiKeySave}
          >Save</Button>
      </Container>
      
    </>
  );
}

export default PageApiKeys;
