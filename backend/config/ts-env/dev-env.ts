type devEvnProps = {
    ENV : string;
    PORT: number;
    HOST: string;

    MONGO_URI : string;

    OLLAMA_MODEL_ID : string;
}

const devEnv : devEvnProps = {
    ENV : process.env.NODE_ENV || "development",
    PORT : parseInt(process.env.PORT || "3000"),
    HOST : process.env.HOST || "localhost",

    MONGO_URI : process.env.MONGO_URI || "mongodb://localhost:27017/rayeva",

    OLLAMA_MODEL_ID : process.env.OLLAMA_MODEL_ID || "ministral-3:3b"
}

export default devEnv;

export type { devEvnProps }