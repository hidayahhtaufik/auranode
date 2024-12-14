---
title: Cheatseet Story Validator
description: Setting Up a Cheatseet Story Validator on the Oddysey Network.
---

# Story Client Cheatseet

- **Check Logs Story Node**: 
```
sudo journalctl -u story -f
```

- **Stop Story Service**: 
```
sudo systemctl stop story
```

- **Restart Story Service**: 
```
sudo systemctl restart story
```

- **Auto Reload Story Service**: 
```
sudo systemctl daemon-reload
```

- **Start Story Service**: 
```
sudo systemctl start story
```

- **Enable Story Service**: 
```
sudo systemctl enable story
```

- **Disable Story Service**: 
```
sudo systemctl disable story
```

- **Check Story Service**: 
```
sudo systemctl status story
```

# Story-Geth Client Cheatseet

- **Check Logs Story-Geth Service**: 
```
sudo journalctl -u story-geth -f
```

- **Stop Story-Geth Service**: 
```
sudo systemctl stop story-geth
```

- **Restart Story-Geth Service**: 
```
sudo systemctl restart story-geth
```

- **Auto Reload Story-Geth Service**: 
```
sudo systemctl daemon-reload
```

- **Start Story-Geth Service**: 
```
sudo systemctl start story-geth
```

- **Enable Story-Geth Service**: 
```
sudo systemctl enable story-geth
```

- **Disable Story-Geth Service**: 
```
sudo systemctl disable story-geth
```

- **Check Story-Geth Service**: 
```
sudo systemctl status story-geth
```

# Validator Command Cheatseet

- **Check Sync Status**: 
```
curl localhost:26657/status | jq
```

- **Check your Validator on Explorer**: 
```
curl -s localhost:26657/status | jq -r '.result.validator_info'
```

- **Check block sync left:**: 
```
while true; do
    local_height=$(curl -s localhost:26657/status | jq -r '.result.sync_info.latest_block_height');
    network_height=$(curl -s https://odyssey.storyrpc.io/status | jq -r '.result.sync_info.latest_block_height');
    blocks_left=$((network_height - local_height));
    echo -e "\033[1;38mYour node height:\033[0m \033[1;34m$local_height\033[0m | \033[1;35mNetwork height:\033[0m \033[1;36m$network_height\033[0m | \033[1;29mBlocks left:\033[0m \033[1;31m$blocks_left\033[0m";
    sleep 5;
done
```

- **Show Validator Info**: 
```
curl localhost:$(sed -n '/\[rpc\]/,/laddr/ { /laddr/ {s/.*://; s/".*//; p} }' $HOME/.story/story/config/config.toml)/status | jq
```

- **Export Validator Public Key**: 
```
story validator export
```

- **Show Validator Private Key**: 
```
cat $HOME/.story/story/config/private_key.txt
```

- **Create Validator**: 
```
story validator create --stake 1024000000000000000000 --private-key "your_private_key" --moniker "your_moniker_name"
```

- **Validator Stake**: 
```
story validator stake \
   --validator-pubkey "<VALIDATOR_PUB_KEY_IN_HEX>" \
   --stake 1024000000000000000000 \
   --private-key xxxxxxxxxxxxxx
```

- **Validator Stake on behalf of other delegator**: 
```
story validator stake-on-behalf \
    --validator-pubkey <VALIDATOR_PUB_KEY_IN_HEX> \
    --delegator-pubkey <DELEGATOR_PUB_KEY_IN_HEX> \
    --stake 1024000000000000000000 --private-key xxxxxxxxxxxxxx
```

- **Validator Unstake**: 
```
story validator unstake \
    --validator-pubkey <VALIDATOR_PUB_KEY_IN_HEX> \
    --unstake 1024000000000000000000 \
    --private-key xxxxxxxxxxxxxx
```

- **Validator Unstake on behalf of other delegator**: 
To do so, you must be a registered authorized operator for this delegator.

```
story validator unstake-on-behalf \
    --validator-pubkey <VALIDATOR_PUB_KEY_IN_HEX> \
    --delegator-pubkey <DELEGATOR_PUB_KEY_IN_HEX> \
    --unstake 1024000000000000000000 \
    --private-key xxxxxxxxxxxxxx
```

- **Validator Add Operator**: 
```
story validator add-operator \
    --operator <OPERATOR_EVM_ADDRESS> \
    --private-key xxxxxxxxxxxxxx
```

- **Validator Remove Operator**: 
```
story validator remove-operator \
    --operator <OPERATOR_EVM_ADDRESS> \
    --private-key xxxxxxxxxxxxxx
```

- **Set or Change Withdrawal Address**: 
```
story validator set-withdrawal-address \
    --withdrawal-address <YOUR_EVM_ADDRESS> \
    --private-key xxxxxxxxxxxxxx
```