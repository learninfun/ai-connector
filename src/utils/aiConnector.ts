export const API_PROVIDER = {
    "OPEN_AI":"OPEN_AI",
};

export const API_MODAL = {
    "ChatGPT3": "gpt-3.5-turbo",
};

export interface ApiConnectorOption {
    aiProvider?: string,
    aiModel?: string, 
    apiKey?: string,
   };

export const ApiConnectorFactory = {
    createApiConnector(optionObj: ApiConnectorOption) {
      switch (optionObj.aiProvider) {
        case API_PROVIDER.OPEN_AI:
            return new ChatGPTApiConnector(optionObj);
          break;
      }
      throw new Error(`Unknown aiProvider "${optionObj.aiProvider}" or aiModel "${optionObj.aiModel}"`);
    }
}

export interface ChatGPTApiConnectorOption {aiModel: string, 
                                            apiKey: string,
                                            apiClient: ChatGPTApiClient,
                                           };

class ChatGPTApiConnector {
    aiModel?: string;
    apiKey?: string;
    apiClient: ChatGPTApiClient;

    constructor(optionObj: ApiConnectorOption) {
        this.aiModel = optionObj.aiModel;
        this.apiKey = optionObj.apiKey;
        this.apiClient = new ChatGPTApiClient(optionObj);
    }

    async callAPI(msg: string) {
        try {
            var responseObj = await this.apiClient.chatCompletionRequest([{role: 'user', content: msg}]);
            return responseObj.choices[0].message.content;
        }
        catch(error) {
            console.log(error)
        }
        
    }
}

export interface ChatGptMessageObj {role:string, content:string}
export interface ChatGPTApiClientOption {aiModel: string, apiKey: string};

export class ChatGPTApiClient {
    aiModel?: string;
    apiKey?: string;
    
    constructor(optionObj: ApiConnectorOption) {
        this.aiModel = optionObj.aiModel;
        this.apiKey = optionObj.apiKey;
    }

    async chatCompletionRequest(messages: ChatGptMessageObj[]) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        };

        const data = {
          model: this.aiModel,
          messages: messages,
        };

        try {
            var response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });

            var responseData = await response.json();
            return responseData;
        }
        catch(e) {
            console.error(e);
        }
    }
}