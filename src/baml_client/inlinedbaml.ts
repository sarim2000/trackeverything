/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/

// This file was generated by BAML: do not edit it. Instead, edit the BAML
// files and re-generate this code.
//
// tslint:disable
// @ts-nocheck
// biome-ignore format: autogenerated code
/* eslint-disable */
const fileMap = {
  
  "clients.baml": "\nclient<llm> GPT3 {\n  provider baml-openai-chat\n  options {\n    model gpt-3.5-turbo\n    api_key env.OPENAI_API_KEY\n  }\n}   \n\nclient<llm> Groq {\n  provider openai\n  options {\n    base_url \"https://api.groq.com/openai/v1\"\n    api_key env.GROQ_API_KEY\n    model \"llama3-8b-8192\"\n  }\n}\n",
  "main.baml": "generator lang_typescript {\n  output_type \"typescript\"\n  output_dir \"../\"\n  version \"0.53.0\"\n}\n ",
  "mood-based.baml": "class MoodBased {\n  mood string\n  media_type string\n}\n\nfunction GetMoodBasedSuggestions(mood: MoodBased) -> AISuggestions[] {\n  client Groq\n  prompt #\"\n    {{ ctx.output_format }}\n    Generate book suggestions for the following user profile:\n    {{ mood }}\n  \"#\n}\n\ntest GetMoodBasedSuggestions {\n  functions [GetMoodBasedSuggestions]\n  args {\n    mood {\n      mood sad\n      media_type book\n    }\n  }\n}\n",
  "personalized-picks.baml": "\nclass UserProfile {\n  bio string\n  age_range string\n  favorite_genre string[]\n  preferred_media string[]\n  language string\n}\n\nclass AISuggestions {\n  title string\n  author string\n  description string\n  reason string @description(\"The reason for the book suggestion, should be very inclusive with user profile\")\n}\n\nfunction SuggestBooks(user_profile: UserProfile) -> AISuggestions[] {\n  client Groq\n  prompt #\"\n    {{ ctx.output_format }}\n    Generate book suggestions for the following user profile:\n    {{ user_profile }}\n  \"#\n}\n \n\ntest SuggestBooksTest {\n  functions [SuggestBooks]\n  args {\n    user_profile {\n      bio \"I'm a 20 year old man who likes to read science fiction and fantasy books.\"\n      age_range \"20-25\"\n      favorite_genre [\"Science Fiction\", \"Fantasy\"]\n      preferred_media [\"Book\", \"Audio Book\"]\n      language \"English\"\n    }\n  }\n}\n\n",
}
export const getBamlFiles = () => {
    return fileMap;
}