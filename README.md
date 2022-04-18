# Latter

## Testing locally

To test locally, first link the library:

```sh
npm link
```

## Aliases

Aliases need to be configured in three locations:

1. `vite.config.js`: Here you can add a new entry to `resolve.alias` where the key corresponds to the alias and the value corresponds to the actual location. The value must be **an absolute path**, starting from the base of the repository.
2. `.eslintrc.js`: Here you need to add a new element to the `settings['import/resolver'].alias.map` array, that itself corresponds to an array with two elements. The first element corresponds to the alias and the second element corresponds to the actual location. The second element must be **a relative path**, starting from the base of the repository.
3. `tsconfig.json`: Here you need to add a new entry to `compilerOptions.paths` where the key corresponds to the alias and the value corresponds to the actual location. The value must be **a relative path**, starting from the base of the repository. Notice that here you must finish the key **and** the value with `/*` for vscode to understand you are referencing folders and autocomplete sub-folders and files.
