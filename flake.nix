{
  description = "Development environment with Hugo, PostCSS, and Go";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }: 
    let 
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
    in flake-utils.lib.eachDefaultSystem (system: {
      devShells.default = pkgs.mkShell {
        packages = [
          (pkgs.hugo.overrideAttrs (old: {
            version = "0.118.2";
            src = pkgs.fetchFromGitHub {
              owner = "gohugoio";
              repo = "hugo";
              rev = "v0.118.2";
              sha256 = "sha256-kEcLcNdhUjCTBfBVMYh+/5xxiCrGWeW8my//FcyXWtA="; # You'll need to get the correct hash
            };
            vendorHash = "sha256-xnkpai3WRIeipWDKrYLPMcjfI1hd6XFRR5H7u2xCp00=";
          }))
          pkgs.nodePackages.postcss
          pkgs.go
	  pkgs.nodePackages.nodejs
        ];
      };
      }
    );
}
