import {
    Account,
    AleoNetworkClient,
    ProgramManager,
} from "@aleohq/sdk";

const NETWORK_URL = "https://api.explorer.aleo.org/v1/testnet";

export const createProgramManager = (privateKey) => {
    const account = new Account({ privateKey });
    const networkClient = new AleoNetworkClient(NETWORK_URL);
    const programManager = new ProgramManager(networkClient);

    programManager.setAccount(account);

    return programManager;
};
