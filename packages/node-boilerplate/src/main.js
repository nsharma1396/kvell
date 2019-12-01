import { validatePackageName, doesDirectoryAlreadyExists } from "./helpers/validationHelpers";
import { createProject } from "./helpers/createProject";
import { parseArgVector } from "./helpers/parseArgVector";

export const createNodeApp = argv => {
  const validatedArgs = parseArgVector(argv);
  if (validatedArgs.valid) {
    const { packageName } = validatedArgs.argsData;

    const isPackageNameValid =
      validatePackageName(packageName) && doesDirectoryAlreadyExists(packageName);

    if (isPackageNameValid) {
      createProject(packageName);
    }
  }
};
