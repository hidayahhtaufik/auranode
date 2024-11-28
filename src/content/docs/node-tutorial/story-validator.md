---
title: Story Validator
description: Setting Up a Story Validator on the Oddysey Network with a VPS
---

This guide walks you through setting up a Story Validator on the Oddysey Network using a Virtual Private Server (VPS).

## System Requirements

- **RAM**: 16 GB
- **CPU**: 4 cores
- **Disk Space**: 500 GB

# Manual Install

1. **Install Dependencies**: 
```
sudo apt update
sudo apt-get update
sudo apt install curl git make jq build-essential gcc unzip wget lz4 aria2 -y
```

2. **Download Story-Geth binary**: 
```
cd $HOME
wget https://github.com/piplabs/story-geth/releases/download/v0.10.1/geth-linux-amd64
[ ! -d "$HOME/go/bin" ] && mkdir -p $HOME/go/bin
if ! grep -q "$HOME/go/bin" $HOME/.bash_profile; then
  echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
fi
chmod +x geth-linux-amd64
mv $HOME/geth-linux-amd64 $HOME/go/bin/story-geth
source $HOME/.bash_profile
story-geth version
```

3. **Download Story binary**: 
```
cd $HOME
rm -rf story-linux-amd64
wget https://github.com/piplabs/story/releases/download/v0.13.0/story-linux-amd64
[ ! -d "$HOME/go/bin" ] && mkdir -p $HOME/go/bin
if ! grep -q "$HOME/go/bin" $HOME/.bash_profile; then
  echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
fi
chmod +x story-linux-amd64
sudo cp $HOME/story-linux-amd64 $HOME/go/bin/story
source $HOME/.bash_profile
story version
```

4. **Init Odyssey node**: 
```
story init --network odyssey --moniker "Your_moniker_name"
```

5. **Create story-geth service file**: 
```
sudo tee /etc/systemd/system/story-geth.service > /dev/null <<EOF
[Unit]
Description=Story Geth Client
After=network.target

[Service]
User=root
ExecStart=/root/go/bin/story-geth --odyssey --syncmode full
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF
```

6. **Create story service file**: 
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

7. **Download Snapshot**: 
```
cd $HOME
rm -f Story_snapshot.lz4
aria2c -x 16 -s 16 -k 1M http://filex.auranode.xyz/snapshot/story/story-latest.tar.lz4
```

8. **Replace Snapshot**: 
```
sudo mkdir -p $HOME/.story/story/data
lz4 -d -c story-latest.tar.lz4 | pv | sudo tar xv -C $HOME/.story/story/ > /dev/null
```

9. **Reload and start story-geth**: 
```
sudo systemctl daemon-reload && \
sudo systemctl start story-geth && \
sudo systemctl enable story-geth && \
sudo systemctl status story-geth
```

10. **Reload and start story**: 
```
sudo systemctl daemon-reload && \
sudo systemctl start story && \
sudo systemctl enable story && \
sudo systemctl status story
```

11. **Check logs story-geth**: 
```
sudo journalctl -u story-geth -f -o cat
```

12. **Check logs story**: 
```
sudo journalctl -u story -f -o cat
```

13. **Check sync status**: 
```
curl localhost:26657/status | jq
```

14. **Check block sync left:**: 
```
while true; do
    local_height=$(curl -s localhost:26657/status | jq -r '.result.sync_info.latest_block_height');
    network_height=$(curl -s https://odyssey.storyrpc.io/status | jq -r '.result.sync_info.latest_block_height');
    blocks_left=$((network_height - local_height));
    echo -e "\033[1;38mYour node height:\033[0m \033[1;34m$local_height\033[0m | \033[1;35mNetwork height:\033[0m \033[1;36m$network_height\033[0m | \033[1;29mBlocks left:\033[0m \033[1;31m$blocks_left\033[0m";
    sleep 5;
done
``` 

15. **Export Validator:**:
```
story validator export
```

``` if you want export private key
story validator export --export-evm-key
```

16. **Create Validator:**:
```
story validator create --stake 1024000000000000000000 --private-key "your_private_key" --moniker "your_moniker_name"
```

17. **Validator Staking:**:
```
story validator stake \
   --validator-pubkey "VALIDATOR_PUB_KEY_IN_HEX" \
   --stake 1024000000000000000000 \
   --private-key xxxxxxxxxxxxxx
```

18. **Check your Validator on Explorer:**:
```
curl -s localhost:26657/status | jq -r '.result.validator_info'
```

19. **Delete Node:**:
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

#### **Story Validator**:
**[My Validator](https://testnet.storyscan.app/validators/storyvaloper1vpq2kgthsrtt5k6t9tm8c2tjscfavkvu4ua3we)**