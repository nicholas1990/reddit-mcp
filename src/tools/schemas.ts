import { z } from 'zod'

const SUBREDDIT = /^[A-Za-z0-9_]{2,21}$/

export const subreddit = z.string().regex(SUBREDDIT, 'A community name without r/ (letters, digits, underscore).').describe('A community name without r/ (for example photography)')
export const sort = z.enum(['relevance', 'top', 'new', 'comments']).default('relevance').describe('How to order the results')
export const time = z.enum(['hour', 'day', 'week', 'month', 'year', 'all']).default('year').describe('How far back to look (for search and for the top listing)')
export const limit = z.number().int().min(1).max(25).default(10).describe('How many posts to return')
export const after = z.string().max(40).optional().describe('Paging: the value printed at the end of the previous answer')
