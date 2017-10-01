declare module "keypair" {
  export interface KeyPair {
    public: string;
    private: string;
  }

  export default function(options: {
    bits?: number;
    e?: number;
}): KeyPair;
}
