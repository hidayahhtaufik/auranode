---
title: Bless Network
---

This guide helps you set up and run the Bless Network node.

## Requirements
- **Sign up with your Google account**  
- **Add Bless Extension** [HERE](https://chromewebstore.google.com/detail/bless/pljbjcehnhcnofmkdbjolghdcjnmekia)  
- **Keep your Node Active** to increase uptime and earn points.

## Getting Started

### Step 1: Clone the Repository
Open your terminal and run the following command:
```
git clone https://github.com/winsnip/BlessWS.git
```

### Step 2: Navigate to the Project Directory
Change to the project folder:
```
cd BlessWS
```

### Step 3: Install Dependencies
Run the following command to install necessary packages:
```
pip install requests
```

### Step 4: Obtain Your Node Information
1. Open your Bless Extension.
2. Right-click and choose "Inspect."
3. Move to the "Network" tab.
4. Before searching for your data, disconnect and reconnect.
5. Look for the URL: `https://gateway-run.bls.dev/api/v1/nodes/12D3KooWD5WKN8VuTebBKaP5Q4fxxxxwSxxxxxx` and the bearer token below it.
6. Copy `12D3KooWD5WKN8VuTebBKaP5Q4fZLwSxxxxxx` from this link and your bearer token.

**NOTE:**  
My pubKey is: `12D3KooWD5WKN8VuTebBKaP5Q4fZLwSxxxxxx` (customize to your own).

### Step 5: Run the Node in Tmux
To run the node in a tmux session, use the following command:
```
tmux new -s bless
```

### Step 6: Start Your Process
Run the main script:
```
python3 main.py
```