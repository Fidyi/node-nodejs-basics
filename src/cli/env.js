const parseEnv = () => {
    const enviromentVariables = process.env;
    const filteredEnviromentVariables = Object.keys(enviromentVariables)
    .filter(key=>key.startsWith('RSS_'))
    .map(key => `${key}=${enviromentVariables[key]}`)
    console.log(filteredEnviromentVariables.join('; '))
};

parseEnv();