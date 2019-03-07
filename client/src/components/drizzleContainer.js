import { drizzleConnect } from "drizzle-react";
import TransferTokens from "./transferTokens";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    xToken: state.contracts.xToken,
    drizzleStatus: state.drizzleStatus,
  };
};

const DrizzleContainer = drizzleConnect(TransferTokens, mapStateToProps);

export default DrizzleContainer;
