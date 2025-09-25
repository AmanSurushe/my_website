# LazyVim Complete Installation & Usage Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Basic Navigation](#basic-navigation)
4. [Essential Key Bindings](#essential-key-bindings)
5. [File Management](#file-management)
6. [Code Editing](#code-editing)
7. [Git Integration](#git-integration)
8. [Plugin Management](#plugin-management)
9. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### System Requirements
- **OS**: Linux, macOS, or Windows
- **Neovim**: Version 0.9.0 or higher
- **Git**: For cloning repositories
- **Node.js**: For LSP servers (optional but recommended)
- **Terminal**: with true color support

### Check Prerequisites
```bash
# Check Neovim version
nvim --version

# Check Git
git --version

# Check Node.js (optional)
node --version
```

---

## 🚀 Installation Steps

### Step 1: Install Neovim

#### Ubuntu/Debian
```bash
# Update package list
sudo apt update

# Install Neovim
sudo apt install neovim

# Or install latest version via snap
sudo snap install nvim --classic
```

#### Arch Linux
```bash
sudo pacman -S neovim
```

#### macOS
```bash
# Using Homebrew
brew install neovim

# Using MacPorts
sudo port install neovim
```

### Step 2: Install a Nerd Font

#### Download and Install JetBrainsMono Nerd Font
```bash
# Create fonts directory
mkdir -p ~/.local/share/fonts

# Download JetBrainsMono Nerd Font
curl -fLo JetBrainsMono.zip https://github.com/ryanoasis/nerd-fonts/releases/download/v3.1.1/JetBrainsMono.zip

# Extract fonts
unzip -o JetBrainsMono.zip -d ~/.local/share/fonts/

# Update font cache
fc-cache -fv ~/.local/share/fonts/

# Clean up
rm JetBrainsMono.zip
```

### Step 3: Configure Terminal Font

#### GNOME Terminal (Ubuntu)
```bash
# Get default profile ID
profile_id=$(gsettings get org.gnome.Terminal.ProfilesList default | tr -d "'")

# Set JetBrainsMono Nerd Font
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:$profile_id/ font 'JetBrainsMono Nerd Font Mono 12'
```

#### Manual Configuration
1. Open Terminal Preferences
2. Go to Profiles → Font
3. Select "JetBrainsMono Nerd Font Mono"
4. Set size to 12-14

### Step 4: Setup Neovim Aliases (Optional)

#### Add to ~/.zshrc or ~/.bashrc
```bash
# Neovim aliases
alias vim=nvim
alias vi=nvim
alias neovim=nvim

# Set as default editor
export EDITOR=nvim
```

#### Reload shell configuration
```bash
source ~/.zshrc  # or ~/.bashrc
```

### Step 5: Install LazyVim

#### Clone LazyVim Starter
```bash
# Backup existing Neovim config (if any)
mv ~/.config/nvim ~/.config/nvim.bak 2>/dev/null

# Clone LazyVim starter
git clone https://github.com/LazyVim/starter ~/.config/nvim

# Remove .git folder (recommended)
rm -rf ~/.config/nvim/.git
```

#### First Launch
```bash
# Launch Neovim - plugins will auto-install
nvim
```

**Note**: First launch will take a few minutes to download and install all plugins.

---

## 🧭 Basic Navigation

### LazyVim Dashboard
When you first open LazyVim, you'll see the dashboard with options:

- **📁 Recent files**: Recently opened files
- **🔍 Find file**: Search for files in current directory
- **📝 New file**: Create a new file
- **⚙️ Config**: Open LazyVim configuration
- **🚀 Lazy**: Open plugin manager

### Window Navigation
| Key | Action |
|-----|--------|
| `<C-h>` | Move to left window |
| `<C-j>` | Move to bottom window |
| `<C-k>` | Move to top window |
| `<C-l>` | Move to right window |

### Buffer Navigation
| Key | Action |
|-----|--------|
| `<S-h>` | Previous buffer |
| `<S-l>` | Next buffer |
| `<leader>bd` | Delete buffer |
| `<leader>bD` | Delete buffer and window |

---

## ⌨️ Essential Key Bindings

### Leader Key
The leader key in LazyVim is `<Space>` (spacebar).

### Most Frequently Used Commands

#### File Operations
| Key Combination | Action | Description |
|-----------------|--------|-------------|
| `<leader>ff` | Find Files | Fuzzy find files in project |
| `<leader>fg` | Live Grep | Search text in all files |
| `<leader>fb` | Buffers | List and switch between open buffers |
| `<leader>fr` | Recent Files | Open recently used files |
| `<leader>fn` | New File | Create a new file |

#### File Explorer
| Key | Action | Description |
|-----|--------|-------------|
| `<leader>e` | Toggle Explorer | Open/close file tree |
| `<leader>E` | Explorer Focus | Focus on file explorer |

#### Code Navigation
| Key | Action | Description |
|-----|--------|-------------|
| `gd` | Go to Definition | Jump to function/variable definition |
| `gr` | Go to References | Find all references |
| `gi` | Go to Implementation | Jump to implementation |
| `K` | Hover | Show documentation/info |
| `<C-o>` | Jump Back | Go to previous location |
| `<C-i>` | Jump Forward | Go to next location |

#### Code Actions
| Key | Action | Description |
|-----|--------|-------------|
| `<leader>ca` | Code Action | Show available code actions |
| `<leader>cr` | Rename | Rename symbol under cursor |
| `<leader>cf` | Format | Format current buffer |

#### Search and Replace
| Key | Action | Description |
|-----|--------|-------------|
| `/` | Search Forward | Search text in current buffer |
| `?` | Search Backward | Search backward in current buffer |
| `n` | Next Match | Go to next search result |
| `N` | Previous Match | Go to previous search result |
| `<leader>sr` | Search Replace | Search and replace in project |

---

## 📁 File Management

### Opening Projects
```bash
# Method 1: Navigate to project and open
cd /path/to/project
nvim .

# Method 2: Open project directly
nvim /path/to/project

# Method 3: Open specific file
nvim /path/to/project/file.js
```

### File Explorer Usage
1. Press `<leader>e` to open file explorer
2. Navigate with `j/k` (down/up) or arrow keys
3. Press `Enter` to open file
4. Press `a` to create new file
5. Press `d` to delete file
6. Press `r` to rename file
7. Press `c` to copy file
8. Press `x` to cut file
9. Press `p` to paste file

### Telescope (Fuzzy Finder)
| Key | Function |
|-----|----------|
| `<leader>ff` | Find files |
| `<leader>fg` | Live grep (search text) |
| `<leader>fb` | Buffers |
| `<leader>fh` | Help tags |
| `<leader>fr` | Recent files |
| `<leader>fc` | Command history |

**Telescope Navigation:**
- `<C-n>` / `<C-p>`: Navigate up/down
- `<C-j>` / `<C-k>`: Navigate up/down (alternative)
- `Enter`: Open file
- `<C-x>`: Open in horizontal split
- `<C-v>`: Open in vertical split
- `<C-t>`: Open in new tab
- `<Esc>`: Close telescope

---

## ✏️ Code Editing

### Basic Vim Motions
| Key | Action |
|-----|--------|
| `h` | Move left |
| `j` | Move down |
| `k` | Move up |
| `l` | Move right |
| `w` | Move to next word |
| `b` | Move to previous word |
| `0` | Move to beginning of line |
| `$` | Move to end of line |
| `gg` | Go to first line |
| `G` | Go to last line |

### Insert Mode
| Key | Action |
|-----|--------|
| `i` | Insert before cursor |
| `a` | Insert after cursor |
| `I` | Insert at beginning of line |
| `A` | Insert at end of line |
| `o` | Open new line below |
| `O` | Open new line above |
| `<Esc>` | Return to normal mode |

### Visual Mode
| Key | Action |
|-----|--------|
| `v` | Character-wise visual mode |
| `V` | Line-wise visual mode |
| `<C-v>` | Block-wise visual mode |
| `y` | Yank (copy) selection |
| `d` | Delete selection |
| `c` | Change selection |

### Advanced Editing
| Key | Action |
|-----|--------|
| `dd` | Delete entire line |
| `yy` | Yank (copy) entire line |
| `p` | Paste after cursor |
| `P` | Paste before cursor |
| `u` | Undo |
| `<C-r>` | Redo |
| `.` | Repeat last action |

---

## 🔧 Git Integration

### LazyVim Git Commands
| Key | Action | Description |
|-----|--------|-------------|
| `<leader>gg` | Lazy Git | Open LazyGit interface |
| `<leader>gb` | Git Blame | Show git blame for current line |
| `<leader>gf` | Git File History | Show file history |
| `<leader>gl` | Git Log | Show git log |

### Git Signs (in gutter)
- `+` : Added lines
- `~` : Modified lines
- `-` : Deleted lines

### Git Hunk Navigation
| Key | Action |
|-----|--------|
| `]h` | Next hunk |
| `[h` | Previous hunk |
| `<leader>hs` | Stage hunk |
| `<leader>hr` | Reset hunk |
| `<leader>hp` | Preview hunk |

---

## 🔌 Plugin Management

### Lazy Plugin Manager
| Key | Action |
|-----|--------|
| `<leader>l` | Open Lazy |

### In Lazy Interface:
| Key | Action |
|-----|--------|
| `I` | Install plugins |
| `U` | Update plugins |
| `S` | Sync plugins |
| `X` | Clean unused plugins |
| `C` | Check plugin health |
| `L` | Show log |
| `P` | Show profile |

### Adding New Plugins
1. Create file: `~/.config/nvim/lua/plugins/your-plugin.lua`
2. Add plugin configuration:
```lua
return {
  "plugin-author/plugin-name",
  config = function()
    -- Plugin configuration here
  end,
}
```
3. Restart Neovim or run `:Lazy sync`

---

## 🎨 Customization

### Theme Selection
LazyVim comes with several themes. To change theme:

1. Open `~/.config/nvim/lua/config/lazy.lua`
2. Find the colorscheme section
3. Change to your preferred theme:
```lua
{
  "LazyVim/LazyVim",
  opts = {
    colorscheme = "tokyonight", -- or "catppuccin", "gruvbox", etc.
  },
}
```

### Key Mapping Customization
Create `~/.config/nvim/lua/config/keymaps.lua`:
```lua
-- Example custom keymaps
local map = vim.keymap.set

-- Save file with Ctrl+s
map("n", "<C-s>", "<cmd>w<cr>", { desc = "Save file" })

-- Clear search highlights
map("n", "<leader>nh", "<cmd>nohl<cr>", { desc = "Clear search highlights" })
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Icons not displaying
**Solution**: Install a Nerd Font and configure your terminal to use it.

#### 2. LSP not working
**Solutions**:
- Install Mason: `<leader>cm` then install language servers
- Check `:LspInfo` for active language servers
- Install Node.js for JavaScript/TypeScript support

#### 3. Telescope not finding files
**Solution**: Make sure you're in the project root directory or check `.gitignore`

#### 4. Slow startup
**Solutions**:
- Check `:Lazy profile` for slow plugins
- Update plugins: `<leader>l` then `U`

#### 5. Plugin errors
**Solutions**:
- Update plugins: `:Lazy sync`
- Check health: `:checkhealth`
- Restart Neovim

### Useful Commands
| Command | Purpose |
|---------|---------|
| `:checkhealth` | Check Neovim health |
| `:LspInfo` | Show LSP information |
| `:Mason` | Open Mason (LSP installer) |
| `:Lazy` | Open plugin manager |
| `:LazyHealth` | Check LazyVim health |

---

## 📚 Learning Resources

### Practice Commands
1. **Vimtutor**: Run `vimtutor` in terminal
2. **LazyVim Docs**: Visit [lazyvim.github.io](https://lazyvim.github.io)
3. **Neovim Docs**: `:help` in Neovim

### Essential Workflow
1. Open project: `nvim .`
2. Find file: `<leader>ff`
3. Search text: `<leader>fg`
4. File explorer: `<leader>e`
5. Save: `:w` or `<C-s>`
6. Quit: `:q` or `<leader>qq`

### Pro Tips
- Use `.` to repeat last action
- Learn text objects: `ciw` (change inner word), `di"` (delete inside quotes)
- Use marks: `ma` (set mark 'a'), `'a` (jump to mark 'a')
- Master search: `/pattern` then `n` for next match
- Use multiple cursors with `<C-n>` in visual mode

---

## 🎯 Quick Reference Card

### Most Used Commands (Print This!)
```
NAVIGATION:           FILE OPERATIONS:        EDITING:
h j k l - Move        <leader>ff - Find       i - Insert mode
w b - Words           <leader>e - Explorer    v - Visual mode  
gg G - Top/Bottom     <leader>bd - Close      u - Undo
<C-o> <C-i> - Jump    :w - Save              <C-r> - Redo

CODE:                 SEARCH:                 SPLITS:
gd - Definition       / - Search             <C-w>s - Horizontal
gr - References       n N - Next/Prev        <C-w>v - Vertical  
K - Hover            <leader>sr - Replace    <C-h/j/k/l> - Move
<leader>ca - Action   * - Search word        
```

---

**🎉 You're now ready to use LazyVim effectively!**

Start with the basic commands and gradually learn more advanced features. Remember, muscle memory takes time to develop, so be patient with yourself.

Happy coding with LazyVim! 🚀
