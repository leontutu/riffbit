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
tag/#issueNo/descriptive-branch-name
```
e. g.
```
feat/#32/add-orm-for-sql-db
```
Omit #issueNo for quick fix/refactor branches with no attached issue 
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
    - Ensure good title format
    - Ensure good body format
- Add second item to bulleted list for presentation purpose
```
Description and bulleted list can be omitted for small changes.
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

### Pull Requests
**Title**
```
tag: #issueNo Title that matches branch name
```
e.g.:
```
feat: #2 Implement ci pipleine
```
**Body**
As in template.


### Merging
- Merge commit for merging PRs into development 
- Create merge commit when merging development into main
- Tag releases on main -> git tag -a v0.1 -m "Release version 0.1"
