---
title: Glacier Node
description: Setting Up a Glacier Node
---

This guide walks you through setting up a Glacier Node.

## System Requirements
- **CPU**: 2 Cores
- **RAM**: 4 GB

## Preparation Before Installing Node

1. Create a new wallet in MetaMask or OKX (save your private key).

2. Add RPC for opBNB Testnet:
   - [Chainlist](https://chainlist.org/chain/5611)

3. Claim BNB Testnet (to claim, you must have 0.002 BNB on the mainnet):
   - [BNB Chain Testnet Faucet](https://bnbchain.org/en/testnet-faucet)
   - [BSC Testnet BNB Faucet](https://faucet.trade/bsc-testnet-bnb-faucet) (this one is free, no need to hold BNB on the mainnet).

4. Swap/bridge from BNB Testnet to opBNB:
   - [opBNB Testnet Bridge](https://opbnb-testnet-bridge.bnbchain.org/deposit)


## Install Node Glacier on Ubuntu-Linux

1. Update packages and install `git`, `wget`, and `tmux`:
```
sudo apt update && sudo apt install git wget tmux -y
```

2. Create a folder for Glacier and download the node files:
```
mkdir glacier && cd glacier && wget https://github.com/Glacier-Labs/node-bootstrap/releases/download/v0.0.2-beta/verifier_linux_amd64 && wget https://glacier-labs.github.io/node-bootstrap/config.yaml
```

3. Edit the `config.yaml` file (edit, paste your private key, save, then press `Ctrl + X`, `Y`, and `Enter`):
```
nano config.yaml
```

4. Set file permissions:
```
chmod +x ./verifier_linux_amd64
```

5. Create a tmux session:
```
tmux new -s glacier
```

6. Run the Node:
```
./verifier_linux_amd64
```

7. Detach from tmux (make sure the node is running; you should see "node already active"):

   - Press `Ctrl`, hold it, press `b`, release both, then press `d`.

8. Reattach to tmux (if you want to check if the node is running):
```
tmux attach -t glacier
```


## Check Node Status

- DONE (check the dashboard, wait for the node to run for about 1 hour):
  - [Node Status](https://testnet.nodes.glacier.io/status)

## Node Information

- Funding: [CryptoRank Glacier Network Funding Rounds](https://cryptorank.io/ico/glacier-network#funding-rounds)
- Discord: [Glacier DC](https://discord.gg/eYAGGz5W3b)
- Incentives: [Getting Started with Glacier Nodes](https://docs.glacier.io/getting-started/glacier-nodes/run-testnet-nodes)