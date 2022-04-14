# ensure-commits-have-ticket-gh-action

```yml
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