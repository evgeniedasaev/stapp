# Contributing

By contributing to Stapp, you agree to abide by the [code of conduct](https://github.com/TinkoffCreditSystems/stapp/blob/master/code-of-conduct.md).

## Instructions

These steps will guide you through contributing to this project:

- Fork the repo
- Clone it and install dependencies

```bash
git clone https://github.com/TinkoffCreditSystems/stapp
cd stapp
npm install
```

- Make your changes. Make sure the commands `npm run build` and `npm run test` are working.

## Updating documentation
* `README.md` in the `./docs/` directory is copied automatically from the root `README.md`, so if you plan to make changes, make them in the root `README.md` file.

### Committing

Please, commit changes with `npm run cz`. This command will run commitizen, which will protect you against commit message pain. You may also install commitizen globally and commit with `git cz`.

You'll be asked about the changes scope. Please, select among the following:

* `core` - any feature and tests changes related to the core `stapp` package
* `validate` - same for `stapp-validate` package
* `loaders` - same for `stapp-loaders` package
* `formbase`- same for `stapp-formbase` package
* `persist` - same for `stapp-persist` package
* `react` - same for `stapp-react` package
* `rxjs` - same for `stapp-rxjs` package
* `select` - same for `stapp-select` package
* `root` - changes related to the root of this project
* use `all` or leave empty when your changes are related to every single package

Finally send a GitHub Pull Request with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit).
