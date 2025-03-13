#!/bin/bash

export PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/" && pwd)"
run() {
    "$PROJECT_ROOT/bin/run" "$@"
}
format() {
    pre-commit run --all-files
}

echo "🛠️  The following commands are now available:"
echo "  🚀 run    - Start all development servers (Django, Svelte, SMTP)"
echo "  ✨ format - Run pre-commit hooks to format and lint all files"
echo
echo "💡 Try them out:"
echo "  $ run     # 🏃 Start development servers"
echo "  $ format  # 🎨 Format code"
