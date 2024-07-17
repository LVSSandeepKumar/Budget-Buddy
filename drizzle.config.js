"use server";

export default {
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://Budget_Buddy_AI_owner:Csp6oJAq5OyY@ep-damp-silence-a5owr5vh.us-east-2.aws.neon.tech/Budget_Buddy_AI?sslmode=require',
    connectionStrings: 'postgresql://Budget_Buddy_AI_owner:Csp6oJAq5OyY@ep-damp-silence-a5owr5vh.us-east-2.aws.neon.tech/Budget_Buddy_AI?sslmode=require'
  },
};
