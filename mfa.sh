#!/bin/bash

# To Use This Script, first run these two commands
# chmod +x mfa.sh 
# then, you're good to go!
# be sure to run all these from the root repo folder

function print_help () {
  printf "USAGE (づ｡◕‿‿◕｡)づ\n"
  printf "(note that there will be instances where user input is required)\n"
  printf "./mfa.sh            ~~>    Show this help display\n"
  printf "./mfa.sh all        ~~>    Deploy everything\n"
  printf "./mfa.sh frontend   ~~>    Deploy GHPages and Host on Firebase\n"
  printf "./mfa.sh api        ~~>    Deploy Python Flask API to Cloud Run\n"
  printf "./mfa.sh ghpages    ~~>    Deploy only to Github Pages\n"
  printf "./mfa.sh firebase   ~~>    Deploy and Host on Firebase\n\n"
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

if [[ $1 == "" ]] #Where "$1" is the positional argument you want to validate 
  then
  printf "\nWelcome to MLforALL Custom CLI \nby Len Huang ヾ(⌐■_■)ノ♪\n\n"
  print_help
  exit 0
fi

# Parse options to the `./mfa` command

subcommand=$1; shift  # Remove 'mfa' from the argument list
start
case "$subcommand" in
  # Parse options to the install sub command
  all ) 
    firebase
    ghpages_nobuild
    api
    shift $((OPTIND -1))
    ;;
  frontend )
    firebase
    ghpages_nobuild
    shift $((OPTIND -1))
    ;;
  api )
    api
    shift $((OPTIND -1))
    ;;
  ghpages )
    ghpages_build
    shift $((OPTIND -1))
    ;;
  firebase )
    firebase
    shift $((OPTIND -1))
    ;;
  * )
    printf "Invalid Command: $subcommand\n" 1>&2
    shift $((OPTIND -1))
    error
    exit 1
    ;;
esac
end