import React, { Component } from 'react';
import CenterCard363 from './centerCard363';
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

export default ({ accounts }) => (
  <div>
  <strong>Total Supply: </strong>
    <AccountData accountIndex="0" units="ether" precision="3" />
  </div>
);