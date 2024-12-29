---
title: Cheatseet Pell Validator
description: Setting Up a Cheatseet Pell Validator on the Ignite_186 Network.
---

# Pellcored Client Cheatseet

- **Check Logs Pellcored Node**: 
```
sudo journalctl -u pellcored -f --no-hostname -o cat
```

- **Stop Pellcored Service**: 
```
sudo systemctl stop pellcored
```

- **Restart Pellcored Service**: 
```
sudo systemctl restart pellcored
```

- **Auto Reload Pellcored Service**: 
```
sudo systemctl daemon-reload
```

- **Start Pellcored Service**: 
```
sudo systemctl start pellcored
```

- **Enable Pellcored Service**: 
```
sudo systemctl enable pellcored
```

- **Disable Pellcored Service**: 
```
sudo systemctl disable pellcored
```

- **Check Pellcored Service**: 
```
sudo systemctl status pellcored
```

# Validator Command Cheatseet

- **Check Sync Status**: 
```
pellcored query status | jq
```

- **Check your Validator on Explorer**: 
```
pellcored query status | jq '{ latest_block_height: .sync_info.latest_block_height, catching_up: .sync_info.catching_up }'
```

- **Check block sync left:**: 
```
while true; do
 local_height=$(pellcored query status | jq -r '.sync_info.latest_block_height');
  network_height=$(curl -s https://rpc-pell.j-node.net/status | jq -r '.result.sync_info.latest_block_height')
  blocks_left=$((network_height - local_height));

  echo -e "\033[1;38mYour node height:\033[0m \033[1;34m$local_height\033[0m | \033[1;35mNetwork height:\033[0m \033[1;36m$network_height\033[0m | \033[1;29mBlocks left:\033[0m \033[1;31m$blocks_left\033[0m";
  sleep 5;
done
```

- **Get Peers:**
```
echo $(pellcored tendermint show-node-id)'@'$(curl -s ipv4.icanhazip.com)':'$(cat $HOME/.pellcored/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

- **Show Validator Info**: 
```
pellcored q staking validator $(pellcored keys show "wallet_name" --bech val -a)
```

- **Edit Validator**: 
```
pellcored tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--security-contact "YOUR_CONTACT"
--chain-id ignite_186-1 \
--commission-rate 0.05 \
--from wallet \
--gas-adjustment 1.5 \
--gas auto \
--gas-prices 40apell \
-y
```

- **Show Validator Key**: 
```
CONSENSUS_PUBKEY=$(pellcored q staking validator pellvaloper1ann5texfvdvtkf7lzqqrdcezg67tx76rrucr03 -oj | jq -r '.validator.consensus_pubkey.value') && \
VALIDATOR_PUBKEY=$(pellcored query status 2>&1 | jq -r .validator_info.pub_key.value) && \
echo "Validator Public Key: $VALIDATOR_PUBKEY" && \
echo "Consensus Public Key: $CONSENSUS_PUBKEY" && \
if [ "$VALIDATOR_PUBKEY" = "$CONSENSUS_PUBKEY" ]; then \
    echo -e "\nResult: Keys match. Your key status is \e[32mOK\e[0m."; \
else \
    echo -e "\nResult: Keys do not match. Your key status is \e[31mERROR\e[0m."; \
fi
```

- **Unjail**: 
```
pellcored tx slashing unjail --from "wallet_name" --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 33apell -y
```

- **Governance Query Proposal**: 
```
pellcored query gov proposals
```

- **Governance Vote Yes/No**: 
```
pellcored tx gov vote 1 yes/no --from "wallet_name" --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 33apell -y
```

- **Send Token to Another Wallet**: 
```
pellcored tx bank send "wallet" <TO_WALLET_ADDRESS> 100000ua0gi --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 33apell -y
```

- **Delegate token to yourself**: 
```
pellcored tx staking delegate $(pellcored keys show "wallet_name" --bech val -a) 1000apell --from "wallet_name" --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 33apell -y
```

- **Redelegate token to another validator**: 
```
pellcored tx staking redelegate $(pellcored keys show "wallet_name" --bech val -a) <TO_VALOPER_ADDRESS> 1000apell --from "wallet_name" --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 33apell -y
```

- **Withdraw Reward from all Validator**: 
```
pellcored tx distribution withdraw-all-rewards --from "wallet_name" --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 33apell -y
```

- **Withdraw commission and reward from your validator**: 
```
pellcored tx distribution withdraw-rewards $(pellcored keys show "wallet_name" --bech val -a) --commission --from "wallet_name" --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 33apell -y
```

- **Unbound token from your validator**: 
```
pellcored tx staking unbond $(pellcored keys show wallet --bech val -a) 100000apell --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 33apell -y
```