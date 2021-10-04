/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type TransactionFailed = ContractEventLog<{
  destination: string;
  index: string;
  data: string;
  0: string;
  1: string;
  2: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface Odin extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Odin;
  clone(): Odin;
  methods: {
    _getBurnCycle(): NonPayableTransactionObject<string>;

    _getBurnFee(): NonPayableTransactionObject<string>;

    _getCycle(): NonPayableTransactionObject<string>;

    _setFeeStage(
      burnFee: number | string | BN
    ): NonPayableTransactionObject<void>;

    allowance(
      owner: string,
      spender: string
    ): NonPayableTransactionObject<string>;

    amount_for_redistribution(): NonPayableTransactionObject<string>;

    amount_to_burn(): NonPayableTransactionObject<string>;

    approve(
      spender: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    balanceOf(account: string): NonPayableTransactionObject<string>;

    decimals(): NonPayableTransactionObject<string>;

    decreaseAllowance(
      spender: string,
      subtractedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    deliver(tAmount: number | string | BN): NonPayableTransactionObject<void>;

    excludeAccount(account: string): NonPayableTransactionObject<void>;

    fee_change_frequency(): NonPayableTransactionObject<string>;

    fee_left_range(): NonPayableTransactionObject<string>;

    fee_right_range(): NonPayableTransactionObject<string>;

    fee_step_count(): NonPayableTransactionObject<string>;

    final_tAmount(): NonPayableTransactionObject<string>;

    includeAccount(account: string): NonPayableTransactionObject<void>;

    increaseAllowance(
      spender: string,
      addedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    isExcluded(account: string): NonPayableTransactionObject<boolean>;

    name(): NonPayableTransactionObject<string>;

    owner(): NonPayableTransactionObject<string>;

    percent_for_redistribution(): NonPayableTransactionObject<string>;

    reflectionFromToken(
      tAmount: number | string | BN,
      deductTransferFee: boolean
    ): NonPayableTransactionObject<string>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    symbol(): NonPayableTransactionObject<string>;

    tAmount_per_fee_change(): NonPayableTransactionObject<string>;

    tokenFromReflection(
      rAmount: number | string | BN
    ): NonPayableTransactionObject<string>;

    totalBurn(): NonPayableTransactionObject<string>;

    totalFees(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    total_cycle_amount(): NonPayableTransactionObject<string>;

    transactions(arg0: number | string | BN): NonPayableTransactionObject<{
      enabled: boolean;
      destination: string;
      data: string;
      0: boolean;
      1: string;
      2: string;
    }>;

    transfer(
      recipient: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    TransactionFailed(cb?: Callback<TransactionFailed>): EventEmitter;
    TransactionFailed(
      options?: EventOptions,
      cb?: Callback<TransactionFailed>
    ): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "TransactionFailed", cb: Callback<TransactionFailed>): void;
  once(
    event: "TransactionFailed",
    options: EventOptions,
    cb: Callback<TransactionFailed>
  ): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
