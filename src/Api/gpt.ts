// 타입 정의
interface ChatGPTResponse {
    choices: {
      message: {
        content: string;
      };
    }[];
  }
  
  export async function getChatGPTResponse(prompt: string): Promise<string> {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4000,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data: ChatGPTResponse = await response.json();
    return data.choices[0].message.content.trim();
  }
  
  export async function getChatGPT4Response(prompt: string): Promise<string> {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4000,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data: ChatGPTResponse = await response.json();
    return data.choices[0].message.content.trim();
  }
  