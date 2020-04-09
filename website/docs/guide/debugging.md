---
id: debugging
title: Debugging in Kvell
---

**This feature is currently only supported in [Visual Studio Code](https://code.visualstudio.com/) for Kvell.**  
It may be extended to [WebStorm](https://www.jetbrains.com/webstorm/) in the future.

# Debugger in VSCode

To enable debugging capabilities, add the block below to your launch.json file and put it inside the .vscode folder in your app’s root directory.

> The following launch.json configuration may change in the future.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "nodemon",
      "program": "${workspaceFolder}/node_modules/kvell-scripts/scripts/start/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```
Start debugging in VS Code by pressing F5 or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor.

Having problems with VS Code Debugging? Please see their [troubleshooting guide](https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md#troubleshooting).

