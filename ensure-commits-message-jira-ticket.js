const git = require("./git.js");
const logger = require("./logging.js");
const reverse = (str) => str.split("").reverse().join("");

logger.logTitle("ENSURING JIRA TICKETS INTO COMMIT MESSAGES");

const baseBranch = process.argv[2];
const prBranch = process.argv[3];

logger.logKeyValuePair("base-branch", baseBranch);
logger.logKeyValuePair("pr-branch", prBranch);

let ok = git
  .getCommitsInsidePullRequest(baseBranch, `origin/${prBranch}`)
  .every((commit) => {
    logger.logTitle("EVALUATING COMMIT");
    let commitMessage = `${commit.subject} ${commit.body}`;
    const reversedTickets = reverse(commitMessage).match(
      /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g
    );
    let commitMessageOk = reversedTickets != null && reversedTickets.length > 0;
    let result = {
      message: commitMessageOk ? "OK" : "WRONG",
      documentation:
        "https://stackoverflow.com/questions/19322669/regular-expression-for-a-jira-identifier",
      guidelines: [
        "Official JIRA Regex ONLY supports capital letters for ticket codes",
      ],
      examples: [
        "feat: GMP-323 awesome new feature",
        "break: removing GET /ping endpoint (LANZ-3456)",
      ],
    };

    logger.logKeyValuePair("commit", commit);

    if (!commitMessageOk) {
      logger.logError(`no ticket provided for the commit`)
    } else {
      logger.logError(`the commit has a ticket`)
    }
    logger.logKeyValuePair("result", result);
    return commitMessageOk;
  });

if (!ok) {
  process.exit(1);
}
