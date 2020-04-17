import { removeDeletedComment } from '../utils/utils';

describe('removes deleted comment from array of objects', () => {
  it('returns an empty object when passed a single object in array', () => {
    const input = [
      {
        comment_id: 290,
        votes: -3,
        created_at: '2018-01-23T12:28:16.824Z',
        author: 'jessjelly',
        body:
          'Sunt omnis pariatur dignissimos quibusdam dolore ut non velit autem. Omnis voluptatibus qui aut sunt ut unde. Ut eaque excepturi numquam quis occaecati. Repellat esse voluptas velit eveniet ut pariatur natus. Velit voluptas nostrum quia dignissimos quisquam incidunt.',
      },
    ];
    const comment_id = 290;
    const actual = removeDeletedComment(input, comment_id);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('returns an array of comments, only filtering out the comment with the passed comment_id', () => {
    const input = [
      {
        comment_id: 290,
        votes: -3,
        created_at: '2018-01-23T12:28:16.824Z',
        author: 'jessjelly',
        body:
          'Sunt omnis pariatur dignissimos quibusdam dolore ut non velit autem. Omnis voluptatibus qui aut sunt ut unde. Ut eaque excepturi numquam quis occaecati. Repellat esse voluptas velit eveniet ut pariatur natus. Velit voluptas nostrum quia dignissimos quisquam incidunt.',
      },
      {
        comment_id: 280,
        votes: 8,
        created_at: '2017-05-06T07:23:39.743Z',
        author: 'tickle122',
        body:
          'Qui magnam error sint ut laborum dicta labore deserunt non. Sit magnam voluptates. Ipsa enim voluptatem. Reprehenderit quod assumenda. Quidem fugiat consequatur in debitis ea sed quos corrupti. Dignissimos necessitatibus distinctio at doloremque enim molestias qui.',
      },
      {
        comment_id: 36,
        votes: 17,
        created_at: '2017-04-30T15:11:32.736Z',
        author: 'jessjelly',
        body:
          'Debitis exercitationem numquam unde quo illo. Iste rerum rerum non accusantium voluptatibus adipisci expedita expedita adipisci. Minima quae velit et ea eveniet. Vero quis itaque. Aliquid facilis dolores consequatur ea amet magni aliquid.',
      },
    ];
    const comment_id = 36;
    const actual = removeDeletedComment(input, comment_id);
    const expected = [
      {
        comment_id: 290,
        votes: -3,
        created_at: '2018-01-23T12:28:16.824Z',
        author: 'jessjelly',
        body:
          'Sunt omnis pariatur dignissimos quibusdam dolore ut non velit autem. Omnis voluptatibus qui aut sunt ut unde. Ut eaque excepturi numquam quis occaecati. Repellat esse voluptas velit eveniet ut pariatur natus. Velit voluptas nostrum quia dignissimos quisquam incidunt.',
      },
      {
        comment_id: 280,
        votes: 8,
        created_at: '2017-05-06T07:23:39.743Z',
        author: 'tickle122',
        body:
          'Qui magnam error sint ut laborum dicta labore deserunt non. Sit magnam voluptates. Ipsa enim voluptatem. Reprehenderit quod assumenda. Quidem fugiat consequatur in debitis ea sed quos corrupti. Dignissimos necessitatibus distinctio at doloremque enim molestias qui.',
      },
    ];
    expect(actual).toEqual(expected);
  });
});
