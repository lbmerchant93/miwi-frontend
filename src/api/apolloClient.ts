import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from "@apollo/client";

const httpLink = createHttpLink({
    uri: 'http://localhost:9000/graphql'
    // uri: 'http://miwi-backend.herokuapp.com/graphql'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default client;