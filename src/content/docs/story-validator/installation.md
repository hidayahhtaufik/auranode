---
title: Story Validator
description: Setting Up a Story Validator on the Aeneid Network with a VPS
---

This guide walks you through setting up a Story Validator on the Aeneid Network using a Virtual Private Server (VPS).

## System Requirements

- **RAM**: 32 GB
- **CPU**: 8 cores
- **Disk Space**: 500 NVMe Drive
- **Bandwith**: 25 MBit/s

# Auto Install

```
wget https://raw.githubusercontent.com/hidayahhtaufik/Testnet-Guides/master/Story%20Protocol/auto-install.sh
chmod +x auto-install.sh
./auto-install.sh
```

# Manual Install

1. **Install Dependencies**: 
```
sudo apt update
sudo apt-get update
sudo apt install curl git make jq build-essential gcc unzip wget pv lz4 aria2 -y
```

2. **Install GO (Skip if you already installed)**: 
```
cd $HOME && \
ver="1.22.0" && \
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" && \
sudo rm -rf /usr/local/go && \
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" && \
rm "go$ver.linux-amd64.tar.gz" && \
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> ~/.bash_profile && \
source ~/.bash_profile && \
go version
```

3. **Download Story-Geth binary v1.1.0**: 
```
cd $HOME
git clone https://github.com/piplabs/story-geth
cd story-geth
git checkout v1.1.0
make geth
cp build/bin/geth $HOME/go/bin/story-geth
source $HOME/.bash_profile
story-geth version
```

4. **Download Story binary v1.3.0**: 
```
cd $HOME
rm -rf story-linux-amd64
wget https://github.com/piplabs/story/releases/download/v1.3.0/story-linux-amd64
[ ! -d "$HOME/go/bin" ] && mkdir -p $HOME/go/bin
if ! grep -q "$HOME/go/bin" $HOME/.bash_profile; then
  echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
fi
chmod +x story-linux-amd64
sudo cp $HOME/story-linux-amd64 $HOME/go/bin/story
source $HOME/.bash_profile
story version
```

5. **Init Odyssey node**: 
```
story init --network aeneid --moniker "Your_moniker_name"
```

6. **Create Story-Geth service file**: 
```
sudo tee /etc/systemd/system/story-geth.service > /dev/null <<EOF
[Unit]
Description=Story Geth Client
After=network.target

[Service]
User=root
ExecStart=/root/go/bin/story-geth --aeneid --syncmode full
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF
```

7. **Create Story Service file**: 
```
sudo tee /etc/systemd/system/story.service > /dev/null <<EOF
[Unit]
Description=Story Consensus Client
After=network.target

[Service]
User=root
ExecStart=/root/go/bin/story run
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF
```

8. **Download Story Snapshot**: 
```
cd $HOME
rm -f Story_snapshot.lz4
aria2c -x 16 -s 16 -k 1M https://story-aeneid-snapshot.auranode.xyz/story_2025-06-23_5866648_snap.tar.lz4 -o snapshot.tar.lz4 -o Story_snapshot.lz4
```

9. **Download Story-Geth Snapshot**:
```
cd $HOME
rm -f Story_snapshot.lz4
aria2c -x 16 -s 16 -k 1M https://story-geth-aeneid-snapshot.auranode.xyz/geth_story_2025-06-23_5866648_snap.tar.lz4 -o Geth_snapshot.lz4
```

10. **Backup priv_validator_state.json**:
```
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/priv_validator_state.json.backup
```

11. **Decompress Story snapshot**:
```
sudo mkdir -p $HOME/.story/story/data
lz4 -d -c Story_snapshot.lz4 | pv | sudo tar xv -C $HOME/.story/story/ > /dev/null
```

12. **Decompress Story-Geth snapshot**: 
```
sudo mkdir -p $HOME/.story/geth/odyssey/geth/chaindata
lz4 -d -c Geth_snapshot.lz4 | pv | sudo tar xv -C $HOME/.story/geth/odyssey/geth/ > /dev/null
```

13. **Restore priv_validator_state.json**:
```
cp $HOME/.story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json
```

14. **Reload and start story-geth**: 
```
sudo systemctl daemon-reload && \
sudo systemctl start story-geth && \
sudo systemctl enable story-geth && \
sudo systemctl status story-geth
```

15. **Reload and start story**: 
```
sudo systemctl daemon-reload && \
sudo systemctl start story && \
sudo systemctl enable story && \
sudo systemctl status story
```

16. **Check logs story-geth**: 
```
sudo journalctl -u story-geth -f -o cat
```

17. **Check logs story**: 
```
sudo journalctl -u story -f -o cat
```

18. **Check sync status**: 
```
curl localhost:26657/status | jq
```

19. **Check block sync left:**: 
```
while true; do
    local_height=$(curl -s localhost:26657/status | jq -r '.result.sync_info.latest_block_height');
    network_height=$(curl -s https://odyssey.storyrpc.io/status | jq -r '.result.sync_info.latest_block_height');
    blocks_left=$((network_height - local_height));
    echo -e "\033[1;38mYour node height:\033[0m \033[1;34m$local_height\033[0m | \033[1;35mNetwork height:\033[0m \033[1;36m$network_height\033[0m | \033[1;29mBlocks left:\033[0m \033[1;31m$blocks_left\033[0m";
    sleep 5;
done
``` 

20. **Export Validator:**:
```
story validator export
```

``` if you want export private key
story validator export --export-evm-key
```

21. **Create Validator:**:
```
story validator create --stake 1024000000000000000000 --private-key "your-evm-priv-key" --moniker "your-moniker-name" --rpc "https://aeneid.storyrpc.io" --chain-id 1315
```

22. **Validator Staking:**:
```
story validator create --stake 1024000000000000000000 --moniker "your-moniker-name" --chain-id 1315 --unlocked=false --private-key "your-evm-priv-key"
```

23. **Check your Validator on Explorer:**:
```
curl -s localhost:26657/status | jq -r '.result.validator_info'
```

24. **Delete Node:**:
```
sudo systemctl stop story-geth
sudo systemctl stop story
sudo systemctl disable story-geth
sudo systemctl disable story
sudo rm /etc/systemd/system/story-geth.service
sudo rm /etc/systemd/system/story.service
sudo systemctl daemon-reload
sudo rm -rf $HOME/.story
sudo rm $HOME/go/bin/story-geth
sudo rm $HOME/go/bin/story
```