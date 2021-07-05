export interface InstagramSchema {
  data: InstagramData[],
  paging: InstagramPaging
}

export interface InstagramData {
  id: string,
  caption: string,
  media_type: string,
  media_url: string,
  permalink: string,
  timestamp: string
}

export interface InstagramPaging {
  cursor: InstagramCursor
}

export interface InstagramCursor {
  before: string,
  after: string,
}