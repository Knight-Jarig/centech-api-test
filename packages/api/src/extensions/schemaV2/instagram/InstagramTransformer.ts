import { IV2InstagramPostsResponse } from 'types/graphql';
import { DateTime } from 'luxon';

export function mapInstagramData(instagramData): IV2InstagramPostsResponse[] {
  const formatted = [];
  if (!instagramData || instagramData.length === 0) return [] as IV2InstagramPostsResponse[]
  else { 
    instagramData.map((data) => {
      formatted.push({
        id: data.id,
        mediaType: data.media_type,
        mediaUrl: data.media_url,
        permalink: data.permalink,
        timestamp: DateTime.fromISO(data.timestamp),
      })
    })
    return formatted
  } 
}