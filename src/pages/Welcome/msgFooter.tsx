/*
import { KeyboardEvent, useState } from 'react';
import { Box, Container, Grid, Select, MenuItem, TextField, CircularProgress, SelectChangeEvent } from "@mui/material";
import { BottomBox } from '@/components/styled';
import { styled } from '@mui/material/styles';
import {TopicThread} from "@/utils/db";
import {ApiConnectorFactory, ApiConnectorOption} from "@/utils/aiConnector";

type CardAnswerListProps = { topicThreads: TopicThread[];
  setTopicThreads: React.Dispatch<React.SetStateAction<TopicThread[]>>;
};

function MsgFooter(props: CardAnswerListProps) {
  const {topicThreads, setTopicThreads} = props;

  const handleKeyEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    debugger;

    var optionObj :ApiConnectorOption = 
       {aiProvider: (document.getElementById('selectAiProvicer') as HTMLSelectElement).value, 
        aiModel: (document.getElementById('selectAiModal') as HTMLSelectElement).value,
        apiKey:localStorage.getItem('ApiKeyOpenAI')??""};

    var aiConnector = ApiConnectorFactory.createApiConnector(optionObj);
    var question = event.currentTarget.value;
    var response = await aiConnector.callAPI(question);
    console.log(response);
    debugger;

    var spinnerSpan = document.getElementById('spinnerLoading');
    if(spinnerSpan!=null) {
      spinnerSpan.style.display = "";
    }
  };
  
  const [selectAiProvicerValue, setSelectAiProvicerValue] = useState<string | unknown>("");
  const handleSelectAiProvicerChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    setSelectAiProvicerValue(event.target.value as string);
  };

  const [score, setScore] = useState('');
  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setScore(event.target.value);
  };

  return (
    <BottomBox component="footer" sx={{pb: 2}}>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Select labelId="selectAiProvicer" id="selectAiProvicer" fullWidth
                    value={score}
                    onChange={handleSelectAiProvicerChange}
            >
              <MenuItem value="OPEN_AI">OpenAI</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select labelId="selectAiModal" id="selectAiModal" defaultValue="gpt-3.5-turbo" fullWidth>
              <MenuItem value="gpt-3.5-turbo">ChatGpt3</MenuItem>
              <MenuItem value="ChatGpt4">ChatGpt4</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={7}>
            <TextField id="inputMsg" placeholder="Send a message..." fullWidth onKeyDown={handleKeyEnter}/>
          </Grid>
          <Grid item xs={1}>
            <CircularProgress color="inherit"/>
          </Grid>
        </Grid>
      </Container>
    </BottomBox>
  );
}

export default MsgFooter;
*/
import {useEffect, useRef, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box, Container, Grid, Select, MenuItem, TextField, CircularProgress, SelectChangeEvent } from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';

import { BottomBox } from '@/components/styled';
import { db, TopicThread, topicThreadDao } from "@/utils/db";
import {ApiConnectorFactory, ApiConnectorOption} from "@/utils/aiConnector";

type CardAnswerListProps = {};

export default function MsgFooter(props: CardAnswerListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState('OPEN_AI');
  
  const handleAiProvicerChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setAiProvider(event.target.value);
  };

  const [aiModel, setAiModel] = useState('gpt-3.5-turbo');
  
  const handleAiModelChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setAiModel(event.target.value);
  };

  const handleKeyEnter = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    setIsLoading(true);
    const inputValue = (event.target as HTMLInputElement).value;
    
    var optionObj :ApiConnectorOption = 
       {aiProvider: aiProvider, 
        aiModel: aiModel,
        apiKey:localStorage.getItem('ApiKeyOpenAI')??""};

    var aiConnector = ApiConnectorFactory.createApiConnector(optionObj);
    var question = inputValue;
    var response = await aiConnector.callAPI(question);
    
    
    var topicThread: TopicThread = {aiProvider: aiProvider, 
      aiModal: aiModel, 
      topic:'default', 
      question:question, 
      answer:response, 
      askTime: Date.now()};

    topicThreadDao.addRecord(topicThread);

    setIsLoading(false);
  };
  

  return (
    <BottomBox component="footer" sx={{pb: 2}}>
      <Container maxWidth="md" sx={{ backgroundColor: '#171717' }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Select
              labelId="selectAiProvicer" id="selectAiProvicer" fullWidth
              value={aiProvider}
              onChange={handleAiProvicerChange}          
            >
              <MenuItem value="OPEN_AI">OpenAI</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select labelId="selectAiModal" id="selectAiModal" fullWidth
              value={aiModel}
              onChange={handleAiModelChange}          
            >
              <MenuItem value="gpt-3.5-turbo">ChatGpt3</MenuItem>
              <MenuItem value="ChatGpt4">ChatGpt4</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={7}>
            <TextField id="inputMsg" placeholder="Send a message..." fullWidth onKeyDown={handleKeyEnter}/>
          </Grid>
          <Grid item xs={1}>
            {isLoading && <CircularProgress color="inherit"/>}
          </Grid>
        </Grid>
      </Container>
    </BottomBox>
  );
}