# Git Conventions

### Workflow
Feature Branch Workflow:
```
main            <--- (Merge from development/hotfix)

hotfix/*        ---> (Branches from main)
                ---> (Merges to main and development)

development     <--- (Merge from feature/*)
                <--- (Merge from hotfix/*)

feature/*       ---> (Branches from development)
                ---> (Merges to development)
```
Refer to Tags below for feature/* vatrations
### Branch Names
```
#issueNo?/tag/descriptive-branch-name
```
e. g.
```
#32/feat/add-orm-for-sql-db
```
### Commit messages
```
tag: Descriptive title in sentence case

Short description of changes.

- Change 1
- Change 2
- ...
```
e.g.
```
feat: Add example commit message

Adds an example commit message to the docs to serve as a 
reference for a good commit message.

- Add commit message
    - Show good title format
    - Show good body format
- Add second item to bulleted list for presentation purpose
```

### Tags
The following tags are valid for commit messages and branch names:
```
- feat:     New feature
- refactor: Code restructuring
- fix:      Bug fix
- chore:    Maintenance tasks
- docs:     Documentation
- test:     Testing
- style:    Formatting
```
### Merging
- Squash and commit when merging PRs
- Create merge commit when merging development into main
- Tag releases on main -> git tag -a v0.1 -m "Release version 0.1"
