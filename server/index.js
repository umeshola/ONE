import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import typeDefs from './logic/schemaGql.js';
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import { MONGO_URI, SECRETE } from './config.js'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})

mongoose.connection.on("error", (err) => {
    console.log("error connecting", err)
})

import './DB/User.js'
import './DB/Comment.js'
import './DB/Friend.js'
import './DB/Friend_request.js'
import './DB/Post.js'
import './DB/Trending.js'
import './DB/Cart.js'
import './DB/Item.js'
import './DB/Order.js'
import './DB/Review.js'

import resolvers from './logic/resolver.js';

const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, SECRETE)
        return { userId }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});