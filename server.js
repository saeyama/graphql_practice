const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Language {
    name: String
    creator: String
  }

  type Query {
    languages: [Language]
  }

  type Mutation {
    addLanguage(name: String!, creator: String!): Language
  }
`;

const languages = [
  {
    name: "Ruby",
    creator: "まつもとゆきひろ"
  },
  {
    name: "Python",
    creator: "グイド・ヴァンロッサム"
  },
  {
    name: "JavaScript",
    creator: "ブレンダン・アイク"
  },
  {
    name: "Go",
    creator: "ロブ・パイク"
  },
];

const resolvers = {
  Query: {
    languages: () => languages
  },
  Mutation: {
    addLanguage: (_, { name, creator }) => {
      const newLanguage = { name, creator };
      languages.push(newLanguage);
      return newLanguage;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
