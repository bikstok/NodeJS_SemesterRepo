## GIT

Git is a version control system for tracking changes in your project. You can initialize a local repository with:

```bash
$ git init

```
This starts a history of commits—snapshots of your project that you can revert to if needed. To check the current status of your files and branch:

```bash
$ git status
```
Before committing changes, you need to stage them:

```bash
$ git add .
$ git add -A
```

`$ git add .` stages changes in the current directory and its subdirectories.

`$ git add -A` stages all changes, including deletions and updates across the project.

After staging, commit your changes with a descriptive message:

```bash
$ git commit -m "Added index.html and project structure"

```

To work on a new feature without affecting the main branch:

```bash
$ git checkout -b "feature-branch"

```

When your feature is ready, first make sure your branch has the latest ``main` changes:


```bash
$ git merge main 

```

Then push your branch to the remote repository:

```bash
$ git push -u origin "feature-branch"
$ git push

```
Finally, pull any updates from ``main`` before continuing work:


```bash
git pull

```

Branches allow safe experimentation without breaking the main project, and pull requests are used to merge your changes back into the main branch in a collaborative environment.