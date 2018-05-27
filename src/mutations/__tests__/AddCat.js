import { request } from 'graphql-request';

const host = 'http://localhost:8080/';

const query = `{
  mutation {
    addCat(
      name: "Novinho", 
      nickName: "pussie", 
      description: "Ooops, I killed a mouse", 
      avatarUrl: "http://tachyons.io/img/cat-720.jpg", 
      age: 5
    ) 
  }
}`;

test('Add new cat', async () => {
  const response = await request(host, query);
  expect(response).toEqual({ addCat: true });
});
