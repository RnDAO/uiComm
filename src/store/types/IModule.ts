export default interface IModule {
  createModule: (module: { name: string; community: string }) => Promise<void>;
  retrieveModules: (module: {
    name: string;
    community: string;
    limit: number;
    page: number;
    sortBy: string;
  }) => Promise<void>;
  reteriveModuleById: (moduleId: string) => Promise<void>;
  patchModule: (module: { moduleId: string; payload: any }) => Promise<void>;
}
