# Campus Connect — GitHub Setup Guide

Follow these steps to set up the project locally and work on your own branch.

## 1. Prerequisites

Make sure you have installed:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (if required by the project)

Check your installation:

```bash
git --version
node --version
npm --version
```

## 2. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/harshrajput-0/campus-connect.git
```

Navigate into the project folder:

```bash
cd campus-connect
```

## 3. Create Your Own Branch

**Do not work directly on `main`.** Create a separate branch for your assigned work.

```bash
git checkout -b your-name
```

Example:

```bash
git checkout -b harsh
```

Use a descriptive branch name if you're working on a specific feature:

```bash
git checkout -b feature/navbar
```

Check your current branch:

```bash
git branch
```

The branch marked with `*` is your current branch.

## 4. Install Dependencies

If the project contains a `package.json` file, install its dependencies:

```bash
npm install
```

Follow any additional setup instructions in the project's README.

## 5. Work on Your Branch

Make your assigned changes and test your work before committing.

Check which files have changed:

```bash
git status
```

Stage and commit your changes:

```bash
git add .
git commit -m "Describe your changes"
```

## 6. Push Your Branch to GitHub

Upload your branch:

```bash
git push -u origin your-name
```

Example:

```bash
git push -u origin harsh
```

Your branch will now be available on GitHub.

## 7. Before Starting New Work

Get the latest changes from the main branch:

```bash
git checkout main
git pull origin main
```

Return to your branch:

```bash
git checkout your-name
```

If you need the latest `main` changes in your branch, merge them:

```bash
git merge main
```

Resolve any merge conflicts before continuing.

## Team Rules

1. Never commit directly to `main`.
2. Each team member must work on their own branch.
3. Use meaningful commit messages.
4. Test your changes before pushing.
5. Do not push another member's unfinished work without coordinating with them.
6. Open a Pull Request when your work is ready for review.
7. Do not merge your Pull Request into `main` without approval from the team lead.

## Useful Commands

| Command | Purpose |
|---|---|
| `git status` | Check changed files and current branch |
| `git branch` | List local branches |
| `git checkout -b name` | Create and switch to a new branch |
| `git checkout name` | Switch branches |
| `git add .` | Stage changes |
| `git commit -m "message"` | Commit changes |
| `git pull origin main` | Get the latest `main` changes |
| `git push -u origin name` | Push your branch to GitHub |

**Repository:** https://github.com/harshrajput-0/campus-connect

If you encounter any Git errors, share the complete error message with the team lead before running commands you don't understand.