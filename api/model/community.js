const utils = require('../utils');

// Criterion 1 (low): Has at least $X stars
const criteria1 = (stars) => stars;

// Criterion 2 (low): Has at least $X forks
const criteria2 = (forks) => forks;

// Criterion 3 (high): X% commits / PRs for past W weeks NOT in core contributors
const criteria3 = (commits, PRs, maintainers) => {
    const notTopContributor = (({ author: { login }}) => !maintainers.includes(login));
    const numPRsNotByMaintainers = PRs.filter(notTopContributor).length;
    const numCommitsNotByMaintainers = commits.filter(notTopContributor).length;
    
    const percentPRs = utils.percentage(numPRsNotByMaintainers, PRs.length);
    const percentCommits = utils.percentage(numCommitsNotByMaintainers, commits.length);  

    const score = utils.roundFloat(utils.average(percentPRs, percentCommits)); 
    return score;
}

// Criterion 4 (high): X% issues for past W weeks NOT in core contributors
const criteria4 = (issues, maintainers) => {
    const issuesNotByMaintainers = issues.filter(({ user: { login }}) => !maintainers.includes(login));
    const score = utils.percentage(issuesNotByMaintainers.length, issues.length);
    return score;
}

exports.get = async ({ 
    repo, 
    commits, 
    PRs, 
    issues, 
    maintainers, 
    cVariables: c
}) => {
    // Process data
    const c1 = (x) => {
        const score = criteria1(repo.stargazers_count);
        return {
            criterion: 'sentiment',
            description: `Has at least ${x} stars`,
            score,
            weight: c.weights.c1,
            pass: score >= x
        }
    }

    const c2 = (x) => {
        const score = criteria2(repo.forks_count);
        return {
            criterion: '3rd party development',
            description: `Has at least ${x} forks`,
            score,
            weight: c.weights.c2,
            pass: score >= x
        }
    }

    const c3 = (x) => {
        const score = criteria3(commits, PRs, maintainers);
        return {
            criterion: 'contributions',
            description: `${Math.round(x*100)}% of commits created by users not in core contributors recently`,
            score,
            weight: c.weights.c3,
            pass: score >= x
        }
    }

    const c4 = (x) => {
        const score = criteria4(issues, maintainers);
        return {
            criterion: 'engagement',
            description: `${Math.round(x*100)}% of issues created by users not in core contributors recently`,
            score,
            weight: c.weights.c4,
            pass: score >= x
        }
    }

    const details = [
        c1(c.x.MIN_STARS),
        c2(c.x.MIN_FORKS),
        c3(c.x.PERCENT_EXTERNAL_COMMITS_PRS),
        c4(c.x.PERCENT_EXTERNAL_ISSUES)
    ];

    return {
        score: details.map(c => c.score * c.weight).reduce((total, v) => total + v, 0),
        details
    };
}