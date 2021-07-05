import { DateTime } from 'luxon';

export const rawPosts = {
  data: [
    {
      id: '18159616267133781',
      caption:
        '\u0e1e\u0e35\u0e41\u0e04\u0e19\u0e40\u0e04\u0e25\u0e37\u0e2d\u0e1a\u0e04\u0e32\u0e23\u0e32\u0e40\u0e21\u0e25\u0e04\u0e35\u0e42\u0e15',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/172881058_208606103973020_3962894527102683283_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=5VNqmeIMXOMAX97RowR&_nc_oc=AQmz1o7ESQwBc6SpE6OHJ8Qqa25MfBvVuDMZMhopM22Se4_8gJ0kS8l_92duO_MPHAs&_nc_ht=scontent.cdninstagram.com&oh=9c8ae5bc1a3ffc183dc6feccece39e17&oe=60B773C6',
      permalink: 'https://www.instagram.com/p/CNrUXNuHn4b/',
      timestamp: '2021-04-15T06:38:52+0000',
    },
    {
      id: '18149113387087332',
      caption: '\u0e27\u0e38\u0e49\u0e19\u0e01\u0e30\u0e17\u0e34\u0e04\u0e35\u0e42\u0e15',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/172890593_764179234236208_3358574059603355087_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=6NWTpDsc8N4AX-F6AxH&_nc_ht=scontent.cdninstagram.com&oh=80c2c75c1acaaf93a3be935aa88d654d&oe=60B6FB2F',
      permalink: 'https://www.instagram.com/p/CNrUJBSnb_P/',
      timestamp: '2021-04-15T06:36:56+0000',
    },
  ],
  paging: {
    cursors: {
      before:
        'QVFIUnBoOEZAuOVBNZAlBMMmFrSU5NYjNtS0htTkRlZA0ZAkaUd3VWpSY3lGTzVvQW15NkQ0YV9BdmozSkZAjYzVCem5sZAXREUWQybmtmU2RLZA3Mwa0w2U0duRS1B',
      after:
        'QVFIUnlDeXMwakRES1k0TkpsNl9Fc2xHVTZApcF9mNEt1LUw3QnpmaElabzc4SDRydXpZAYzdRNFI4TDhZAYnRVRWxCMUUyV2N0U1NvVlF3NGVCYU1oNDNqeFZA3',
    },
  },
}

export const rawPostsEmpty = {
  data: [],
  paging: {
    cursors: {
      before:
        'QVFIUnBoOEZAuOVBNZAlBMMmFrSU5NYjNtS0htTkRlZA0ZAkaUd3VWpSY3lGTzVvQW15NkQ0YV9BdmozSkZAjYzVCem5sZAXREUWQybmtmU2RLZA3Mwa0w2U0duRS1B',
      after:
        'QVFIUnlDeXMwakRES1k0TkpsNl9Fc2xHVTZApcF9mNEt1LUw3QnpmaElabzc4SDRydXpZAYzdRNFI4TDhZAYnRVRWxCMUUyV2N0U1NvVlF3NGVCYU1oNDNqeFZA3',
    },
  },
}

export const posts = [
  {
    "id": "18159616267133781",
    "mediaType": "IMAGE",
    "mediaUrl": "https://scontent.cdninstagram.com/v/t51.29350-15/172881058_208606103973020_3962894527102683283_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=5VNqmeIMXOMAX97RowR&_nc_oc=AQmz1o7ESQwBc6SpE6OHJ8Qqa25MfBvVuDMZMhopM22Se4_8gJ0kS8l_92duO_MPHAs&_nc_ht=scontent.cdninstagram.com&oh=9c8ae5bc1a3ffc183dc6feccece39e17&oe=60B773C6",
    "permalink": "https://www.instagram.com/p/CNrUXNuHn4b/",
    "timestamp": DateTime.fromISO("2021-04-15T06:38:52+0000")
  },
  {
    "id": "18149113387087332",
    "mediaType": "IMAGE",
    "mediaUrl": "https://scontent.cdninstagram.com/v/t51.29350-15/172890593_764179234236208_3358574059603355087_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=6NWTpDsc8N4AX-F6AxH&_nc_ht=scontent.cdninstagram.com&oh=80c2c75c1acaaf93a3be935aa88d654d&oe=60B6FB2F",
    "permalink": "https://www.instagram.com/p/CNrUJBSnb_P/",
    "timestamp": DateTime.fromISO("2021-04-15T06:36:56+0000")
  }
]