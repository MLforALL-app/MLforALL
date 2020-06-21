#!/bin/bash

# To Use This Script, first do these two things
# 1) chmod +x mfa.sh 
# 2) alias `mfa /path/to/your/repo/mfa.sh` (add this to ~/.bashrc)
# then, you're good to go!
# be sure to run all these from the root repo folder

function print_help () {
  printf "USAGE (づ｡◕‿‿◕｡)づ\n"
  printf "(note that there will be instances where user input is required)\n"
  printf "mfa            ~~>    Show this help display\n"
  printf "mfa all        ~~>    Deploy everything\n"
  printf "mfa frontend   ~~>    Deploy GHPages and Host on Firebase\n"
  printf "mfa api        ~~>    Deploy Python Flask API to Cloud Run\n"
  printf "mfa ghpages    ~~>    Deploy only to Github Pages\n"
  printf "mfa firebase   ~~>    Deploy and Host on Firebase\n\n"
}

function check_git() {
  printf "Checking that this directory contains MLforALL repo... ಠ_ಠ\n"
  url=`git config --get remote.origin.url`
  if [ "$url" != "https://github.com/lenghuang/MLforAll.git" ]
  then
    printf "\nNoooo wrong repo, bring me back! (ಥ﹏ಥ) \n"
    error
    exit 1
  fi
}

function check_dir() {
  printf "Checking you're in the root directory... ಠ╭╮ಠ\n"
  dir=`pwd`
  if [ "${dir: -8}" != "MLforAll" ]
  then
    printf "\nWrong Directory!!! You're in ...${dir: -32}\n"
    printf "Go back to /MLforAll! ᕙ(⇀‸↼‶)ᕗ \n"
    error
    exit 1
  fi
}

function check() {
  check_git
  check_dir
  printf "All checks passed! ~(˘▾˘~) \n\n"
}

function ghpages_build() {
  cd frontend
  printf "Building and deploying to Github Pages (☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)\n\n"
  npm run deploy 
  cd ..
}

function ghpages_nobuild(){
  cd frontend 
  printf "Running gh-pages (☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)\n\n"
  gh-pages -d build
  cd ..
}

function firebase () {
  cd frontend 
  printf "Deploying to Firebase (◕‿◕✿)\n\n"
  firebase deploy 
  cd ..
}

function api () {
  cd api
  printf "Building Docker Image (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ \n\n"
  gcloud builds submit --tag gcr.io/mlforall-api/flask-api
  printf "Loading to Google Cloud Platform (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ \n\n"
  gcloud run deploy "flask-api" --image gcr.io/mlforall-api/flask-api --platform=managed --region=us-east1
  cd ..
}

function start() {
  printf "Starting MLforALL CLI...(╯°□°）╯︵ ┻━┻\n\n"
}

function end() {
  printf "\n┬──┬ ノ( ゜-゜ノ) ....safely ending MLforALL CLI\n"
}

function error() {
  printf "\nERROR: ┻━┻ ︵ヽ(\`Д´)ﾉ︵ ┻━┻ \n"
}

# Parse options to the `./mfa` command

subcommand=$1; shift  # Remove 'mfa' from the argument list
start
case "$subcommand" in
  # Parse options to the install sub command
  all ) 
    check
    firebase
    ghpages_nobuild
    api
    shift $((OPTIND -1))
    ;;
  frontend )
    check
    firebase
    ghpages_nobuild
    shift $((OPTIND -1))
    ;;
  api )
    check
    api
    shift $((OPTIND -1))
    ;;
  ghpages )
    check
    ghpages_build
    shift $((OPTIND -1))
    ;;
  firebase )
    check
    firebase
    shift $((OPTIND -1))
    ;;
  "" )
    check
    printf "\nWelcome to MLforALL Custom CLI \nby Len Huang ヾ(⌐■_■)ノ♪\n\n"
    print_help
    shift $((OPTIND -1))
    ;;
  * )
    check
    printf "Invalid Command: $subcommand\n" 1>&2
    shift $((OPTIND -1))
    error
    exit 1
    ;;
esac
end