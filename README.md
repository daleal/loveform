<p align="center">
  <a href="https://github.com/daleal/loveform">
    <img src="https://loveform.daleal.dev/assets/images/loveform-300x300.png">
  </a>
</p>

<h1 align="center">Loveform</h1>

<p align="center">
  <em>
    The Vue form assembly tool that <strong>won't break your heart</strong> 💔.
  </em>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/loveform" target="_blank">
    <img src="https://img.shields.io/npm/v/loveform?label=version&logo=nodedotjs&logoColor=%23fff&color=f92e61" alt="NPM - Version">
  </a>

  <a href="https://github.com/daleal/loveform/actions?query=workflow%3Alinters" target="_blank">
    <img src="https://img.shields.io/github/workflow/status/daleal/loveform/linters?label=linters&logo=github" alt="Linters">
  </a>
</p>

**Loveform** is a tool that helps you build validated forms in Vue 3 without the need to handle the whole validation process yourself. This means that you no longer need to write a `submit` function with a huge `if` - `else if` - `else` chain of conditionals and a whole bunch of error variables. Just import the component you need to use, write a validation function and _voilà_! Your form is _production ready_!

## Why Loveform?

When building forms, you can choose between using no library _at all_, using one of the libraries that include form validation handling as a secondary _feature_ (like [Vuetify](https://vuetifyjs.com/en)) or using **Loveform**.

If you decide to use no library _at all_, you will soon find yourself with a ton of variables holding errors for different inputs, large validations that include tons of `if` statements and a huge template to tie it all together. Soon enough, you will start writing your own form assembly solution (**just as I did**), wasting valuable time that could be better used writing code that will **actually improve your business/project**.

If you decide to use a library that includes form validation handling as a secondary _feature_ (like [Vuetify](https://vuetifyjs.com/en)), you will probably have a **Very hard time** customizing how your forms look like. These libraries **almost always include default styling** and other _features_ that you probably don't want nor need.

If you decide to use **Loveform**, you will have the power to write fully validatable forms **without having to worry about the validation chain**, while being able to **fully style your components** however you desire 😈.

The [complete documentation](https://loveform.daleal.dev/docs/) is available on the [official website](https://loveform.daleal.dev/).

## Installation

Install using npm! (or your favourite package manager)

```sh
# Using npm
npm install loveform

# Using yarn
yarn add loveform
```

Please note that **Loveform** will only work with **Vue 3**.

## Basic Usage

The basic principle is simple: write a form as you would write an ordinary form with no validations, add some validations to the fields you want to validate and then **forget about validations and focus on the rest of your application**. Here's an example of an (_unstyled_) validated form:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { LForm, LInput } from 'loveform';

const email = ref('');
const password = ref('');

const emailValidations = [
  (content: string) => !!content.trim() || 'The \'email\' field is required',
  (content: string) => content.includes('@') || 'Invalid email',
];
const passwordValidations = [
  (content: string) => content.length >= 6 || 'The password needs at least 6 characters',
  (content: string) => !content.includes('&') || 'The password can\'t include the \'&\' character',
];

const submit = async () => {
  // This will only run if the validations pass
  await axios.post('https://backend.you/signup', {
    email: email.value,
    password: password.value,
  });
};
</script>

<template>
  <LForm @submit="submit">
    <LInput
      v-model="email"
      :validations="emailValidations"
    />
    <LInput
      v-model="password"
      :validations="passwordValidations"
    />
    <button type="submit">Submit!</button>
  </LForm>
</template>
```

Each validation corresponds to a function that receives the value in the input and returns `true` (if the value of the input is correct) or an error string. Each validation will be run _sequentially_ from the first validation of the array to the last one, and the first validation to fail will be displayed as the error.

## Development

### Testing locally

To test locally, first link the library:

```sh
npm link
```

Then `cd` into the `dev` folder and copy the `LPlayground.template.vue` into a `LPlayground.vue` file:

```sh
cd dev
cp src/LPlayground.template.vue src/LPlayground.vue
```

Now, edit the `LPlayground.vue` file _risk free_ to try the components you're working on:

```sh
nano src/LPlayground.vue  # or your favorite editor
```

Finally, run `npm install` and start the playground server!

```sh
npm install
npm run dev
```

You can see the development server running at `http://localhost:3000`.

## Resources

- [Official Website](https://loveform.daleal.dev/)
- [Issue Tracker](https://github.com/daleal/loveform/issues/)
