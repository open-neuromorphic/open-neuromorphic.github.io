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
          # System-level dependencies required by the project.
          # These versions are based on your project's configuration files.
          buildInputs = with pkgs; [
            # Hugo Extended v0.147.7+
            hugo

            # Go v1.24.3+
            go_1_24

            # Node.js v22.x+
            nodejs_22

            # Git is good practice to include
            git

            # Required by Puppeteer, a dev dependency in package.json
            # This prevents Puppeteer from downloading its own browser binary.
            chromium

            # Add bash-completion to prevent shell startup errors
            bash-completion
          ];

          # Set environment variables required for the shell.
          shellHook = ''
            # Point Puppeteer to the Chromium binary provided by Nixpkgs
            export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
            export PUPPETEER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"

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
