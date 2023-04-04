import { Card, CardContent, Typography } from "@mui/material";
import {TopicThread} from "@/utils/db";
import CustomMarkdown from './CustomMarkdown'

type CardAnswerProps = { topicThread: TopicThread};

function CardAnswer({topicThread}: CardAnswerProps) {
   
    return (
      <Card sx={{mt:2}}>
        <CardContent>
          <Typography variant="h5" component="div">
            Question
          </Typography>
          {topicThread.question}
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            Answer
          </Typography>
          <CustomMarkdown>{topicThread.answer}</CustomMarkdown>
        </CardContent>
      </Card>
    );
}

export default CardAnswer;