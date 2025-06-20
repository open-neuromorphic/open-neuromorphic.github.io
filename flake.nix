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
          ];

          shellHook = ''
            export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
            export PUPPETEER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"

            # Set a nice, readable prompt for the Nix shell
            # This is the corrected version.
            export PS1="\\[\\033[01;32m\\][nix-dev]\\[\\033[00m\\] \\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ "

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
