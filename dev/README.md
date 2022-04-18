# Development Application

You can use this application as a development playground.

Inside the `src` sub-folder you will find a `GPlayground.template.vue` file. Copy the contents of that file into a `GPlayground.vue` file on the same directory and put anything you need inside that file! It will be gitignored, so you can't screw up your Pull Request by trying your component.

## Importing components

To import a component from the library, first build the library and then just import it:

```ts
import { GButton } from 'latter';
```
