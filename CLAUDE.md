# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Obsideck is a Stream Deck plugin that integrates with Obsidian via the Local REST API. It provides two main actions:
- **Run Command**: Executes Obsidian commands by ID
- **Open File**: Opens specific files in Obsidian

The plugin communicates with Obsidian through HTTP(S) requests using an API key for authentication.

## Development Commands

### Linting and Formatting
```bash
# Run Biome formatter and linter with auto-fix
pnpm check

# Format code only
pnpm format

# Lint code only (no auto-fix)
pnpm lint
```

### Validation
```bash
# Validate the Stream Deck plugin structure
pnpm validate
```

Note: There are no tests configured in this project.

## Architecture

### Stream Deck Plugin Structure

The plugin follows the standard Stream Deck plugin format with all source code in `src/dev.jduabe.obsideck.sdPlugin/`:

- **manifest.json**: Plugin metadata, defines two actions (Run Command and Open File)
- **app.html**: Main entry point referenced by `CodePath` in manifest
- **Action files**:
  - `runcommand.js`: Handles executing Obsidian commands via `/commands/{commandId}/` endpoint
  - `openfile.js`: Handles opening files via `/open/{filePath}` endpoint
- **Property Inspector files**:
  - `runcommand.html`: Configuration UI for Run Command action
  - `openfile.html`: Configuration UI for Open File action
  - `inspector.js`: Shared logic for property inspector forms (handles settings sync)

### Key Architectural Patterns

**Action Implementation**: Each action (runcommand, openfile) follows this pattern:
1. Creates a new `Action` instance with the action UUID
2. Registers an `onKeyUp` handler that:
   - Extracts settings (apiKey, url, and action-specific params)
   - Strips trailing slashes from URL using `url.replace(/\/+$/, "")`
   - Makes a fetch request to the Obsidian Local REST API
   - Shows success/error feedback via `$SD.showOk()` or `$SD.showAlert()`

**Property Inspector**: Uses shared `inspector.js` logic:
- Loads existing settings into form via `Utils.setFormValue()`
- Debounces form input changes (150ms) before saving via `$PI.setSettings()`

**API Integration**: All actions communicate with Obsidian Local REST API:
- Authentication via `Authorization: Bearer ${apiKey}` header
- Base URL format: `${scheme}://localhost:${port}` (http or https)
- Run Command: `POST ${url}/commands/${commandId}/`
- Open File: `POST ${url}/open/${filePath}?newLeaf=true`

### Code Quality

The project uses Biome for linting and formatting with these settings:
- Line width: 120 characters
- Double quotes for JavaScript
- Trailing commas required
- Semicolons only when needed (ASI)
- LF line endings
- `useConst` rule disabled (allows `let` usage)

Pre-commit hooks run `lint-staged` which auto-formats changed files via Biome.

## Packaging and Release

Stream Deck plugins are packaged using the `@elgato/cli` tool. The GitHub workflow `.github/workflows/package.yml` automatically packages the plugin on version tags using the `j4ckofalltrades/streamdeck-package` action.

The plugin directory structure must remain in `src/dev.jduabe.obsideck.sdPlugin/` as this path is referenced in the packaging workflow.
