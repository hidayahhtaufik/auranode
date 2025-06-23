---
title: Upgrade Story Validator
description: Upgrade Story-Geth v0.11.0
---

This guide walks you through upgrade Story-Geth v1.1.0

# Manual Upgrade

1. **Stop Service Story-Geth**: 
```
sudo systemctl stop story-geth
```

2. **Download Story-Geth binary**: 
```
cd $HOME
rm geth-linux-amd64
wget https://github.com/piplabs/story-geth/releases/download/v1.1.0/geth-linux-amd64
chmod +x geth-linux-amd64
mv $HOME/geth-linux-amd64 $HOME/go/bin/story-geth
source $HOME/.bash_profile
story-geth version
```

3. **Restart Story-Geth Service**: 
```
sudo systemctl restart story-geth
sudo journalctl -u story-geth -f -o cat
```