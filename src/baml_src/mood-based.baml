class MoodBased {
  mood string
  media_type string
}

function GetMoodBasedSuggestions(mood: MoodBased) -> AISuggestions[] {
  client Groq
  prompt #"
    {{ ctx.output_format }}
    Generate book suggestions for the following user profile:
    {{ mood }}
  "#
}

test GetMoodBasedSuggestions {
  functions [GetMoodBasedSuggestions]
  args {
    mood {
      mood sad
      media_type book
    }
  }
}
