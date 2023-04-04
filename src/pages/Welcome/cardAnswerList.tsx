import {TopicThread} from "@/utils/db";
import CardAnswer from "./cardAnswer";
import { useLiveQuery } from "dexie-react-hooks";
import { db, topicThreadDao } from "@/utils/db";


type CardAnswerListProps = { topicThreads: TopicThread[] | undefined};

function CardAnswerList(props: CardAnswerListProps) {
    const {topicThreads} = props;
    return (
        <>
          {topicThreads?.map(topicThread => <CardAnswer key={topicThread.id} topicThread={topicThread}></CardAnswer>)}
        </>
    )
}

export default CardAnswerList;