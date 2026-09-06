const fs = require("fs");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server");

const DATA_FILE = path.join(__dirname, "data.json");

const seedLanguages = [
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

function loadLanguages() {
  if (!fs.existsSync(DATA_FILE)) {
    saveLanguages(seedLanguages);
    return seedLanguages;
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function saveLanguages(languages) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(languages, null, 2));
}

let languages = loadLanguages();

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

const resolvers = {
  Query: {
    languages: () => languages
  },
  Mutation: {
    addLanguage: (_, { name, creator }) => {
      const newLanguage = { name, creator };
      languages.push(newLanguage);
      saveLanguages(languages);
      return newLanguage;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
