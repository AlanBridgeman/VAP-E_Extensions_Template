# VAP-E Extension: Template Repository
This repository serves as a template/sample repository for authoring a new VAP-E extension. Extension authors can use this repository as a resource when they first start writing their extension as it includes several helpful pieces includeing:

- Easy to use scripts for testing and bundling the extension properly.
- Having a webpage to display the extension's UI component (note, that styling wise this may not match exactly but it's something)

## User Interface/UI (React)
Two key things to know about creating your UI with this repository: 

1. That there is a `test` script available
2. That there is a `build` script available

### Testing
In terms of testing an extension's UI, you can use the `test` script defined in package.json (that uses [Gulp](https://gulpjs.com/) behind the scenes). 

However, before running it you'll want to go into the `test/test-index.jsx` file and place your component within it. One important note here is that the import may not be what you expect. It should be something similar to:

```js
import [Component Name] from './[Component File Name]';
```

where you replace `[Component Name]` and `[Component File Name]` with their appropraite values. This is because with bundling this file ends up in the same directory as your component files.

Once that's done, to run it you'd simply use the following command in your terminal:

```sh
yarn test
```

or

```sh
npm run test
```

if you really want to go that way. 

In terms of what this does is it bundles and compiles everything and all that. But, the important part is, that it puts a `dist` folder under the `test` folder. Once this exists you can view your extension's UI by opening the `test/index.html` file in a web browser.

It's worth noting this may not be a perfect replica of what the extension UI ends up looking like within VAP-E but it should give a vague idea.

### Building/Bundling
To build/bundle the extension using ths repository is really easy. Just run the following in a terminal:

```sh
yarn build
```

or

```sh
npm run build
```

if you want to go this way.

Once run, you'll see a dist folder with a bundle.js file inside.