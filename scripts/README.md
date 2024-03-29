# Bash Scripts for Easier Deployment

This file contains custom commands to make our deployment process easier.
MLforALL makes use of **Firebase Hosting**, **Google Cloud Run**, and **Github Pages** to deploy our code to.

### Setup Procedure

1. Make sure your repo is up to date
2. Run `chmod +x mfa.sh` to enable executable permission for this file.
3. In either `~/.bashrc`, `~/.zshrc`, or similar file, add an alias (may vary between different OS)
   <br />
   _for example... on my MacOS device, I added to `~.zshrc` the following line of code:_
   `alias mfa="/Users/lenny/Coding/Personal/MLforAll/scripts/mfa.sh"`
   <br />
   _Likewise, for different devices, yours should look somewhat similar to this:_
   `alias mfa="/<PATH_TO_CLONED_REPO>/MLforAll/scripts/mfa.sh"`

### Usage Guide

-   `mfa` Shows help menu
-   `mfa all` Deploys ALL services used in MLforALL
-   `mfa api` Deploys Python FlaskAPI to Google Cloud Run
-   `mfa firebase` Deploys production build to Frontend Hosting

### Usage on Terminal

(this images is out of date)
<img src="../frontend/src/pictures/scripts/works.png" width="500"/>

### Checks for Proper Repo Folder

<img src="../frontend/src/pictures/scripts/wrongrepo.png" width="500"/>

### Checks for Root Directory

<img src="../frontend/src/pictures/scripts/wrongfolder.png" width="500"/>
