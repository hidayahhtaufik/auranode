---
title: Cysic Node
description: Setting Up a Node on the Cysic Network
---

This guide walks you through setting up a Node on the Cysic Network.

## System Requirements

- **CPU**: 1 Core
- **RAM**: 512 MB
- **Disk Space**: 1 GB

## Preparation Before Installation

1. Create a new wallet
2. Register at [Cysic Testnet](https://testnet.cysic.xyz/m/).
   - Enter the referral code: `baad7`.
   - Connect your wallet to register.
3. Create a username and upload your profile picture.

## Install Genesis Node Verifier (Cysic Phase II) on Ubuntu-Linux

### 1. Update Packages and Install Required Tools

Open your terminal and run the following command to update your packages and install `tmux` and `curl`:

```
sudo apt update && sudo apt install tmux curl -y
```

### 2. Setup Node

Replace `0x-Your-Address` with your wallet address in the command below:
```
curl -L https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_linux.sh > ~/setup_linux.sh && bash ~/setup_linux.sh 0x-Your-Address
```

### 3. Create a tmux Session

Create a new tmux session for your node:
```
tmux new -s cysic
```

### 4. Run Node

Navigate to the Cysic verifier directory and start the node:
```
cd ~/cysic-verifier/ && bash start.sh
```