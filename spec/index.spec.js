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
    describe('general', () => {
      it('GET responds with 404 for an invalid path', () => {
        return request
          .get('/thiswontwork')
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal('404 Page Not Found')
          })
      })
    })
    describe('topics', () => {
      it('GET responds with 200 and a list of topics', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then(res => {
            expect(res.body.topics[0]).to.contain.keys('title', 'slug');
            expect(res.body.topics.length).to.equal(topicDocs.length)
          })
      })
      it('/:topic_slug/articles GET responds with 200 and a list of articles with the passed topic', () => {
        return request
          .get('/api/topics/cats/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles.length).to.equal(2)
            expect(res.body.articles[0].belongs_to).to.eql(res.body.articles[1].belongs_to)
          })
      })
      it('/:topic_slug/articles GET responds with 404 when topic is not found', () => {
        return request
          .get('/api/topics/shops/articles')
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal('Topic "shops" not found')
          })
      })
    })
    describe('articles', () => {
      it('GET responds with 200 and a list of articles', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles.length).to.equal(articleDocs.length)
          })
      })
      it('/:article_id/comments GET responds with all comments for one article', () => {
        return request
          .get(`/api/articles/${articleDocs[1]._id}/comments`)
          .expect(200)
          .then(res => {
            expect(res.body.comments.length).to.equal(2)
            expect(res.body.comments[0].belongs_to).to.eql(res.body.comments[1].belongs_to)
          })
      })
      it('/:article_id/comments GET responds with 404 when article id is not found', () => {
        return request
          .get(`/api/articles/5b51e71d2f98232c51cc3e39/comments`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("Cannot read property '_id' of null")
          })
      })
      it('/:article_id/comments GET responds with 400 when article id is not valid', () => {
        return request
          .get(`/api/articles/asdfzg/comments`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal(`Cast to ObjectId failed for value "asdfzg" at path "_id" for model "articles"`)
          })
      })
      it('GET a single article by id', () => {
        return request
          .get(`/api/articles/${articleDocs[1]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.foundArticle).to.contain.keys('title', 'belongs_to', 'created_by', 'body', 'created_at', 'votes')
          })
      })
      it('/:article_id/ GET responds with 404 when article id is not found', () => {
        return request
          .get(`/api/articles/5b51e71d2e98242c21cc3e39`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("Article with ID 5b51e71d2e98242c21cc3e39 not found")
          })
      })
      it('/:article_id/ GET responds with 400 when article id is not valid', () => {
        return request
          .get(`/api/articles/asdfzg`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal(`Cast to ObjectId failed for value "asdfzg" at path "_id" for model "articles"`)
          })
      })
      it('PUT a vote counter up on a single article', () => {
        return request
          .put(`/api/articles/${articleDocs[1]._id}?vote=up`)
          request
          .put(`/api/articles/${articleDocs[1]._id}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body.foundArticle.votes).to.equal(articleDocs[1].votes +2)
          })
      })
      it('PUT a vote counter down on a single article', () => {
        return request
          .put(`/api/articles/${articleDocs[1]._id}?vote=down`)
          request
          .put(`/api/articles/${articleDocs[1]._id}?vote=down`)
          .expect(200)
          .then(res => {
            expect(res.body.foundArticle.votes).to.equal(articleDocs[1].votes -2)
          })
      })
      it('/:article_id?vote PUT responds with 404 when article id is not found', () => {
        return request
          .get(`/api/articles/5b51e71d2e98242c21cc3e39?vote=down`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("Article with ID 5b51e71d2e98242c21cc3e39 not found")
          })
      })
      it('/:article_id?vote PUT responds with 400 when article id is not valid', () => {
        return request
          .get(`/api/articles/asdfzg?vote=down`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal(`Cast to ObjectId failed for value "asdfzg" at path "_id" for model "articles"`)
          })
      })
      it('POST a comment onto an article', () => {
        return request
          .post(`/api/articles/${articleDocs[1]._id}/comments`)
          .send({
            created_by: `${userDocs[1]._id}`,
            body: "Green is not a creative colour",
          })
          .expect(201)
          .then(res => {
            expect(res.body.comment).to.contain.keys('belongs_to', 'body', 'created_at', 'created_by', 'votes')
            expect(res.body.comment.body).to.equal("Green is not a creative colour")
          })
      })
      it('/:article_id/ POST responds with 404 when article id is not found', () => {
        return request
          .get(`/api/articles/5b51e71d2e98242c21cc3e39?vote=down`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("Article with ID 5b51e71d2e98242c21cc3e39 not found")
          })
      })
      it('/:article_id/ POST responds with 400 when article id is not valid', () => {
        return request
          .get(`/api/articles/asdfzg?vote=down`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal(`Cast to ObjectId failed for value "asdfzg" at path "_id" for model "articles"`)
          })
      })
    })
    describe('users', () => {
      it('/:username GET returns a JSON object with profile data for the user', () => {
        return request
          .get('/api/users/dedekind561')
          .expect(200)
          .then(res => {
            expect(res.body.foundUser).to.contain.keys('username', 'name', 'avatar_url')
          })
      })
      it('/:username GET responds with 404 when username is not found', () => {
        return request
          .get('/api/users/sergeantwuffles')
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("Username sergeantwuffles not found")
          })
      })
    })
    describe('comments', () => {
      it('PUT a vote counter up on a single comment', () => {
        return request
          .put(`/api/comments/${commentDocs[1]._id}?vote=up`)
          request
          .put(`/api/comments/${commentDocs[1]._id}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body.updatedVote.votes).to.equal(commentDocs[1].votes + 2)
          })
      })
      it('PUT a vote counter down on a single comment', () => {
        return request
          .put(`/api/comments/${commentDocs[1]._id}?vote=down`)
          request
          .put(`/api/comments/${commentDocs[1]._id}?vote=down`)
          .expect(200)
          .then(res => {
            expect(res.body.updatedVote.votes).to.equal(commentDocs[1].votes - 2)
          })
      })
      it('PUT counter returns 404 when the comment ID is not found', () => {
        return request
          .put(`/api/comments/5b51e71d2e98242c21cc3e39?vote=down`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("Comment with ID 5b51e71d2e98242c21cc3e39 not found")
          })
      })
      it('PUT counter returns 400 when the comment ID is not valid', () => {
        return request
          .put(`/api/comments/steve?vote=down`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal(`Cast to ObjectId failed for value "steve" at path "_id" for model "comments"`)
          })
      })
      it('DELETE a comment by ID', () => {
        return request
          .delete(`/api/comments/${commentDocs[1]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.message).to.equal('Comment Deleted')
            return request
              .get(`/api/articles/${articleDocs[1]._id}/comments`)
              .then(res => {
                expect(res.body.comments.length).to.equal(1)
              })
          })
      })
    })
  })
})