type devEvnProps = {
    ENV : string;
    PORT: number;
    HOST: string;
}

const devEnv : devEvnProps = {
    ENV : process.env.NODE_ENV || "development",
    PORT : parseInt(process.env.PORT || "3000"),
    HOST : process.env.HOST || "localhost"
}

export default devEnv;

export type { devEvnProps }