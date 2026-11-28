/**
 * The parts of Reddit's answers this server reads. Every field is optional on purpose: the data comes from outside,
 * so nothing is assumed to be there, and the formatting code decides what to do when a field is missing.
 */
export type RedditPost = {
  id?: string
  title?: string
  author?: string
  subreddit?: string
  created_utc?: number
  score?: number
  upvote_ratio?: number
  num_comments?: number
  link_flair_text?: string | null
  permalink?: string
  is_self?: boolean
  url?: string
  selftext?: string
  over_18?: boolean
  removed_by_category?: string | null
}

export type RedditComment = {
  author?: string
  body?: string
  score?: number
  created_utc?: number
  removed_by_category?: string | null
  replies?: '' | { data?: { children?: Thing[] } }   // Reddit sends an empty string when there are no replies
}

/** What Reddit wraps everything in: kind t3 is a post, t1 a comment, "more" a stub for hidden comments. */
export type Thing = { kind?: string; data?: RedditPost & RedditComment }
export type Listing = { data?: { children?: Thing[]; after?: string | null } }
