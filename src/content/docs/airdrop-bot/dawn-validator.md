---
title: Dawn Validator
---


#### Requirements

- Install Extension Dawn dan Sudah Punya Akun
- Token Bot Father
- ID Telegram
- Ip Proxy (Optional)

**Ubuntu-Linux**

```
bash <(curl -s https://file.winsnip.xyz/file/uploads/DawnBot.sh)
```

***Check logs***
```
sudo journalctl -u dawnbot -f
```

***Restart Service***
```
sudo systemctl restart dawnbot
```

***Remove Service***
```
sudo systemctl stop dawnbot && \
sudo systemctl disable dawnbot && \
sudo rm /etc/systemd/system/dawnbot.service && \
sudo systemctl daemon-reload && \
sudo rm -rf /root/DawnBot 
```