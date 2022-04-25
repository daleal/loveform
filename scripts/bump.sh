#!/bin/sh

if [ $(git symbolic-ref --short HEAD) != master ]; then
    echo "This script is supposed to be run on the \"master\" branch."
    exit 1
fi

if [ -z $1 ]; then
    echo "A bump rule (\"patch\", \"minor\", \"major\") must be passed as a parameter."
    exit 1
fi

# Get old version
OLD_VERSION=$(npm run --silent version:get)

# Bump up package.json version and get new version
npm version $1 --no-git-tag-version && NEW_VERSION=$(npm run --silent version:get)

# Get the scripts directory name and the base directory name
SCRIPTS=$(cd $(dirname $0) && pwd)
BASEDIR=$(dirname $SCRIPTS)

# Commit changes into release branch
git add $BASEDIR/package.json $BASEDIR/package-lock.json &&
git checkout -b release/prepare-$NEW_VERSION &&
git commit --message "Prepare the $NEW_VERSION release"
