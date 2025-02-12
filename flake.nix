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
          }))
          pkgs.nodePackages.postcss
          pkgs.go
        ];
      };
      }
    );
}
