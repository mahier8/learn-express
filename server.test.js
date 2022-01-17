const { mongoose } = require("mongoose");
const createServer = require("./server");
const Post = require("./models/Post");
const supertest = require("supertest");

// a function to connect to MongoDB
beforeEach((done) => {
    mongoose.connect(
        "mongodb://localhost:27017/acmedb",
        {useNewUrlParser: true },
        () => done()
    )
})

// a function to remove all the
// data once a test case is finished
afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
})

const app = createServer();

test("GET /posts", async () => {
    const post = await Post.create({
        title: "Post 1",
        content: "Lorem ipsum",
    })

    await supertest(app)
        .get("/api/posts")
        .expect(200)
        .then((response) => {
            // checking the response type and length 
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body.length).toEqual(1)

            // checking the response data
            expect(response.body[0]._id).toBe(post.id) 
            expect(response.body[0].title).toBe(post.title)
            expect(response.body[0].content).toBe(post.content)
        })
})