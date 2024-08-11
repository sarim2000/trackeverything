
class UserProfile {
  bio string
  age_range string
  favorite_genre string[]
  preferred_media string[]
  language string
}

class AISuggestions {
  title string
  author string
  description string
  reason string @description("The reason for the book suggestion, should be very inclusive with user profile")
}

function SuggestBooks(user_profile: UserProfile) -> AISuggestions[] {
  client Groq
  prompt #"
    {{ ctx.output_format }}
    Generate book suggestions for the following user profile:
    {{ user_profile }}
  "#
}
 

test SuggestBooksTest {
  functions [SuggestBooks]
  args {
    user_profile {
      bio "I'm a 20 year old man who likes to read science fiction and fantasy books."
      age_range "20-25"
      favorite_genre ["Science Fiction", "Fantasy"]
      preferred_media ["Book", "Audio Book"]
      language "English"
    }
  }
}

