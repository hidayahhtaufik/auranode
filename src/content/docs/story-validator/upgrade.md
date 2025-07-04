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

This guide walks you through upgrade Story v1.3.0

# Manual Upgrade

1. **Stop Service Story**: 
```
sudo systemctl stop story
```

2. **Download Story binary**: 
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

3. **Restart Story Service**: 
```
sudo systemctl restart story
sudo journalctl -u story -f -o cat
```