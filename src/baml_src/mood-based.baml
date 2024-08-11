class MoodBased {
  mood string
  media_type string
}

function GetMoodBasedSuggestions(mood: MoodBased) -> AISuggestions[] {
  client GPT3
  prompt #"
    {{ ctx.output_format(prefix="Generate book suggestions for the following user profile:") }}
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
