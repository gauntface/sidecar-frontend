#!/bin/bash
set -euo pipefail

current_datetime=$(date "+%Y-%m-%d.%H-%M")

# Define the source file and the destination directory
temp_file=".env.tmp"
source_file=".env"
backup_file=".env.${current_datetime}.backup"

# Log in to bitwardn
if npx @bitwarden/cli login --check; then
    echo "Already logged in."
else
    echo "Need to log in to bitwarden."
    npx @bitwarden/cli login
fi

npx @bitwarden/cli sync

# Start debug output
set -x

npx @bitwarden/cli get notes 'sidecars-frontend [dev]' > $temp_file;

if [[ -f "$source_file" ]] && cmp -s "$temp_file" "$source_file"; then
    echo "Files have the same content."
    rm $temp_file
    exit 0
fi

echo "Need to create/update env file.";

# Check if the file exists and back it up if it does
if [ -f "$source_file" ]; then
    # Move the file
    mv "$source_file" "$backup_file"
    echo "Existing ${source_file} moved to ${backup_file}."
fi

mv $temp_file $source_file
