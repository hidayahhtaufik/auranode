---
title: Spheron Node
description: Setting Up a Worker Node on the Spheron Network with a VPS
---

This guide walks you through setting up a Worker Node on the Spheron Network using a Virtual Private Server (VPS).

## System Requirements

- **RAM**: 8 GB
- **CPU**: 4 cores
- **Disk Space**: 100 GB

## Registration Process

1. Register via [Spheron Network](https://app.spheron.network/login) and sign up using either your email or GitHub account.
2. Connect with your wallet.
3. Click "Register Node Fizz." to begin the registration process.
4. Choose your **OS**, allocate **resources**, select your **region**, and choose your **node provider** along with the appropriate tier.
5. Claim your faucet tokens to get started.
6. Download the setup script `fizzup.sh`, to your local machine.


## Moving `fizzup.sh` to Your VPS

1. On your local machine, open the script using nano:

```
nano fizzup.sh
```

2. After reviewing the script, press Ctrl + X, then press Y to save the changes, and hit Enter to exit.

3. Now, copy and transfer the file to your VPS using a secure file transfer method such as scp:

```
scp fizzup.sh your_username@your_vps_ip:/root
```

## Installation Steps

### 1. Install Docker (Skip if Docker is already installed)

To set up Docker, use the following commands:

```bash
sudo apt update -y && sudo apt upgrade -y
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done

sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update -y && sudo apt upgrade -y

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker installation
docker --version
```

### 2. Install Script

After transferring the fizzup.sh setup script to your VPS, execute the following commands to install the node:

```bash
chmod +x /root/fizzup.sh && ./fizzup.sh
```

## Checking Logs
```bash
docker-compose -f ~/.spheron/fizz/docker-compose.yml logs -f
```