import { drizzleConnect } from "drizzle-react";
import TransferTokens from "./transferTokens";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus,
  };
};

const DrizzleContainer = drizzleConnect(TransferTokens, mapStateToProps);

export default DrizzleContainer;
