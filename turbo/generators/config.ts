import path from "path";
import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // __dirname is the turbo/generators/ directory; monorepo root is two levels up
  const repoRoot = path.resolve(__dirname, "../..");

  plop.setGenerator("package", {
    description: "Scaffold a new rkit package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Package name (e.g. retriever):",
        validate: (input: string) => {
          if (!input) return "Name is required";
          if (!/^[a-z0-9-]+$/.test(input)) return "Use lowercase letters and hyphens only";
          return true;
        },
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: path.join(repoRoot, "packages/{{name}}"),
        base: "templates/package",
        templateFiles: "templates/package/**",
        globOptions: { dot: true },
      },
    ],
  });
}
