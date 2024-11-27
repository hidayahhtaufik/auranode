---
title: Coub Bot
---

## Requirements
- **Node.js** (version 12 or higher)
- **npm** (Node package manager)

**LINUX/VPS**

1. For Linux/VPS installation, simply copy and run the following command in the terminal:

```
bash <(curl -s https://file.winsnip.xyz/file/uploads/coub.sh)
```

2. To enter a new token after installation, open the `data.txt` file:

```
nano ~/coub-bot/data.txt
```

***Info Service***
```
systemctl status coub-bot
```

***Restart Service***
```
systemctl restart coub-bot
```

***Stop Service***
```
systemctl stop coub-bot
```

***Check logs***
```
journalctl -u coub-bot -f
```

3. If you want to run the bot manually, use the following command:

```
node ~/coub-bot/index.js
```


**Termux**

1. For Termux users, this script can also be run. Copy and run the command below in Termux:

```
bash <(curl -s https://file.winsnip.xyz/file/uploads/coub.sh)
```

2. To run the bot, use the following command:
```
coub-bot
```



**Windows**

1. This script can also be used in WSL. After installation, you can run the bot using the command:

```
coub-bot
```
