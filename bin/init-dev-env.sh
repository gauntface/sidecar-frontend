#!/bin/bash
set -euo pipefail

current_datetime=$(date "+%Y-%m-%d.%H-%M")

# Define the source file and the destination directory
source_file=".env.development"
destination_dir=".env.${current_datetime}.backup"

# Start debug output
set -x

# Check if the file exists
if [ -f "$source_file" ]; then
    # Move the file
    mv "$source_file" "$destination_dir"
    echo "Existing .env moved to ${destination_dir}."
fi

npx @bitwarden/cli login || true;
npx @bitwarden/cli get notes 'sidecars-frontend [dev]' > "$source_file";
