---
title: Cosmovisor
description: Setting Up a Cosmovisor
---

This guide walks you through setting up a Cosmovisor.

# Manual Install

1. **Install Go**: 
```
cd $HOME && \
ver="1.22.0" && \
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" && \
sudo rm -rf /usr/local/go && \
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" && \
rm "go$ver.linux-amd64.tar.gz" && \
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile && \
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> ~/.bash_profile && \
source ~/.bash_profile && \
go version
```

2. **Install Cosmovisor**: 
```
source $HOME/.bash_profile
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

- check cosmovisor version
```
cosmovisor version
```

3. **Init Cosmovisor**:
- Set DAEMON_HOME:
```
export DAEMON_NAME=story
echo "export DAEMON_NAME=story" >> $HOME/.bash_profile
export DAEMON_HOME=$HOME/.story/story
echo "export DAEMON_HOME=$HOME/.story/story" >> $HOME/.bash_profile
```

- Initialize Cosmovisor with DAEMON_HOME:
```
cosmovisor init $(whereis -b story | awk '{print $2}')
```

- Create the backup directory:
   (Now that DAEMON_HOME is defined, you can create the necessary directories.)
```
mkdir -p $DAEMON_HOME/cosmovisor/backup
echo "export DAEMON_DATA_BACKUP_DIR=$DAEMON_HOME/cosmovisor/backup" >> $HOME/.bash_profile
echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=false" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

4. **Create Upgrade Folder**: 
```
mkdir -p $HOME/.story/story/cosmovisor/genesis/bin
mkdir -p $HOME/.story/story/cosmovisor/upgrades/v0.13.0/bin
```

5. **Installation Story**: 
- Stop Story Service
```
sudo systemctl stop story
```

- Download Story Binary v0.13.1
```
cd $HOME
rm story-linux-amd64
wget https://github.com/piplabs/story/releases/download/v0.13.1/story-linux-amd64
chmod +x story-linux-amd64
```

- Copy new binary to upgrades folder
```
sudo cp $HOME/story-linux-amd64 $HOME/.story/story/cosmovisor/upgrades/v0.13.1/bin/story
```

6. **Verify Setup**: 
- Check current symlink
```
ls -l /root/.story/story/cosmovisor/current
```

- Check the story version in genesis folder. It should be old version is v0.13.0
```
$HOME/.story/story/cosmovisor/genesis/bin/story version
```

- Check the new binary version in upgrade folder. It should be new version v0.13.1
```
$HOME/.story/story/cosmovisor/upgrades/v0.13.1/bin/story version
```

- Check upgrade info
```
cat $HOME/.story/story/cosmovisor/upgrades/v0.13.0/upgrade-info.json
```

7. **Upgrade Story Service File**:
```
sudo tee /etc/systemd/system/story.service > /dev/null <<EOF
[Unit]
Description=Story Consensus Client
After=network.target

[Service]
User=root
Environment="DAEMON_NAME=story"
Environment="DAEMON_HOME=/root/.story/story"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=true"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_DATA_BACKUP_DIR=/root/.story/story/data"
Environment="UNSAFE_SKIP_BACKUP=true"
ExecStart=/root/go/bin/cosmovisor run run
Restart=always
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF
``

8. **Restart Story Service**:
```
sudo systemctl daemon-reload
sudo systemctl start story && sudo systemctl status story
```