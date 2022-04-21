# ensure-commits-have-ticket-gh-action

This action checks that ALL commits present in a pull request include a JIRA ticket. Useful for teams that require an extra level of traceability on their work and tasks. Here is an example:

```yml
name: CI
on:
  pull_request:
    branches: ["main"]
jobs:
  check-jira-tickets-commits:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
  jira-tickets-commits:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: ohpensource/ensure-commits-have-ticket-gh-action@main
        name: Ensure Jira ticket in all commits
        with:
          base-branch: $GITHUB_BASE_REF
          pr-branch: $GITHUB_HEAD_REF
```

The action essentially scans your commit messages [looking](https://stackoverflow.com/questions/19322669/regular-expression-for-a-jira-identifier) for JIRA tickets. In case a commit has no ticket, the action will fail.

## remarks

:warning: commits that contain `[skip ci]` are skipped from the validation.