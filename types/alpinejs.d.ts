declare module "alpinejs" {
  interface Alpine {
    start(): void;
    data(name: string, callback: () => Record<string, unknown>): void;
    store(name: string, value: Record<string, unknown>): void;
    initTree(el: Node): void;
    destroyTree(el: Node): void;
    prefix(newPrefix: string): void;
    version: string;
  }
  const Alpine: Alpine;
  export { Alpine };
  export default Alpine;
}
