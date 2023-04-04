// db.js
import Dexie, { Table } from 'dexie';
import { ApiConnectorFactory } from './aiConnector';
import { useLiveQuery } from "dexie-react-hooks";

export interface TopicThread {
    id?: number;
    aiProvider: string;
    aiModal: string;
    topic: string;
    question: string;
    answer: string;
    askTime: number;
};

export class MySubClassedDexie extends Dexie {
  topicThreads?: Table<TopicThread, number>; 

  constructor() {
    super('AiConnector');
    this.version(1).stores({
        topicThreads: '++id, aiProvider, aiModal, topic, question, answer, askTime'
    });
  }
}

export const db = new MySubClassedDexie();


export var topicThreadDao = {
    MAX_RECORDS: 100,
    getRecords: async function() {
        return await db.topicThreads?.orderBy('askTime').toArray();
    },
    getRecordsLive: function() {
        var records = useLiveQuery(
          this.getRecords
        );

        //if(records===undefined) {
        //    const myArray: TopicThread[] = [];
        //    records = myArray;
        //}

        return records;
    },
    addRecord: async function(record: TopicThread) {
        if(db.topicThreads==null) {
            return;
        }
        const table = db.topicThreads;
        await db.topicThreads?.add(record);
        const count = await db.topicThreads?.count();
        if (count > this.MAX_RECORDS) {
          const oldestRecord = await db.topicThreads?.orderBy('askTime').first();
          if (!oldestRecord) {
            throw new Error("oldestRecord is undefined");
          }

          await table.delete(oldestRecord.id??-1);
        }
    },
    clear: async function() {
        if(db.topicThreads==null) {
            return;
        }
        db.topicThreads.clear();
    }
};
