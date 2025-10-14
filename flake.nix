{
  description = "A dev-shell for the Open Neuromorphic Hugo project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            hugo
            go_1_24
            nodejs_22
            git
            chromium
            bash-completion
            ncurses # Provides 'tput' for colors
          ];

          shellHook = ''
            # Point Puppeteer to the Nix-provided Chromium
            export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
            export PUPPETEER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"

            # Enable history and other interactive features
            set -o vi # or set -o emacs for emacs keybindings
            HISTFILE=~/.bash_history_nix_dev
            history -c
            history -r

            # Set a nice, readable prompt using tput for portability
            if command -v tput >/dev/null && tput setaf 1 >/dev/null; then
                green=$(tput setaf 2)
                blue=$(tput setaf 4)
                reset=$(tput sgr0)
                export PS1="$green[nix-dev]$reset $blue\w$reset$ "
            else
                export PS1='[nix-dev] \w\$ '
            fi

            echo ""
            echo "----------------------------------------------------"
            echo "  Welcome to the Open Neuromorphic dev environment! "
            echo ""
            echo "  All system dependencies (Hugo, Node.js, Go) are in your PATH."
            echo "  1. Run 'npm install' to get project-specific packages."
            echo "  2. Run 'npm run dev' to start the Hugo server."
            echo "----------------------------------------------------"
            echo ""
          '';
        };
      }
    );
}
