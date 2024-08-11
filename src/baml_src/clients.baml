
client<llm> GPT3 {
  provider baml-openai-chat
  options {
    model gpt-3.5-turbo
    api_key env.OPENAI_API_KEY
  }
}   

client<llm> Groq {
  provider openai
  options {
    base_url "https://api.groq.com/openai/v1"
    api_key env.GROQ_API_KEY
    model "llama3-8b-8192"
  }
}
