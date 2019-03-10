import React, { Component } from 'react';
import { LoadingContainer } from "drizzle-react-components";
import CenterCard363 from '../centerCard363';
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

export default ({ accounts }) => (
  <div>
    <LoadingContainer>
    <CenterCard363>
      <div className='card border-secondary'>
        <h4 className="card-header">
          Transfer Tokens
        </h4>
        <div className='card-body'>
          <ContractData
            contract="xToken"
            method="balanceOf"
            methodArgs={[accounts[0]]}
          />
          <ContractForm
            contract="xToken"
            method="transfer"
            labels={["To Address", "Amount to Send"]}
          />
        </div>
      </div>
    </CenterCard363>
    </LoadingContainer>

  </div>
);