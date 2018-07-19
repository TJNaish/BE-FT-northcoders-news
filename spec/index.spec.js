const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const seedDB = require('../seed/seed');
const testData = require('../seed/testData');

describe('ncnews', () => {
  let articleDocs;
  let commentDocs;
  let topicDocs;
  let userDocs;
  beforeEach(() => {
    return seedDB(testData)
      .then(docs => {
        [userDocs, topicDocs, articleDocs, commentDocs] = docs;
      })
  })
  after(() => {
    return mongoose.disconnect();
  })
  describe('ncnews', () => {
    describe('topics', () => {
      it('1 GET responds with 200 and a list of topics', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then(res => {
            expect(res.body.topics[0]).to.contain.keys('title', 'slug');
            expect(res.body.topics.length).to.equal(2)
          })
      })
      it('2 /:topic_slug/articles GET responds with 200 and a list of articles', () => {
        return request
          .get('/api/topics/cats/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles.length).to.equal(2)
          })
      })
    })
    describe('articles', () => {
      it('1 GET responds with 200 and a list of articles', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles.length).to.equal(4)
          })
      })
      it('2 /:article_id/comments GET responds with all comments for one article', () => {
        console.log(articleDocs[0] + '<<<ARTICLE<<<')
        console.log('---------')
        console.log(commentDocs[0] + '<<<COMMENT<<<')
        console.log('---------')
        console.log(topicDocs[0] + '<<<TOPIC<<<')
        console.log('---------')
        console.log(userDocs[0] + '<<<USER<<<')
        return request
          .get(`/api/articles/${articleDocs[0]}/comments`)
          .expect(200)
          .then(res => {
            expect(res.body.comments.length).to.equal(234567890)
          })
      })
    })
    describe('users', () => {
      it('1 /:username GET returns a JSON object with profile data for the user', () => {
        return request
          .get('api/users/dedekind561')
          .expect(200)
          .then(res => {
            expect(res.body.users).to.contain.keys('username', 'name', 'avatar_url')
          })
      })
      it('2 /:username/repos returns a JSON array with all the public repos of the specified user.', () => {
        return request
          .get('api/users/dedekind561/repos')
          .expect(200)
          .then(res => {
            expect(res.body.users.length).to.equal(230947)
          })
      })
    })
  })
})