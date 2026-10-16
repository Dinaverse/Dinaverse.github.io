# Dinaverse portfolio site

Source of **https://dinaverse.github.io/**, my portfolio as an infrastructure and cybersecurity student: home lab projects, one graded deliverable per course this session, skills, and contact.

## What is here

| Path | Content |
| --- | --- |
| `index.html` | Home page |
| `projects.html` | Home lab projects, each linked to its own repository |
| `session-project.html` | One graded deliverable per course (Windows Server, databases, applied security, programming) |
| `lab-topology.html` | Interactive view of the lab layout |
| `skills.html`, `about.html`, `contact.html` | Skills, background, contact |
| `reports/` | PDF write-ups of the session deliverables |
| `styles.css`, `shared.js` | Shared styling and navigation |

Plain static HTML, CSS and JavaScript. No build step, no framework. `.nojekyll` tells GitHub Pages to serve the files as they are.

## How it is published

The site was first built and served privately inside the home lab, on a reverse-proxy container reachable only over the lab's private mesh VPN. To make it public without exposing any lab host to the internet, I moved it to GitHub Pages instead of opening a tunnel into the lab:

1. Copied the site out of the container to my main Linux workstation, leaving backup files behind.
2. Ran a privacy check on every HTML/JS file and on the text of every PDF before anything left the lab: no student ID, no mesh VPN addresses or hostnames, no lab partner names. The only addresses left are the isolated 192.168.10.x network from a school lab exercise.
3. Created this repository with the GitHub CLI and pushed the site to `main`.
4. Turned on GitHub Pages for `main`, root folder, HTTPS enforced.

Why GitHub Pages rather than exposing the lab copy:

- The lab container also runs a reverse proxy for other internal services. Publishing it directly would open a lab host to the internet.
- GitHub Pages serves static files only, with no path back into the home network.
- A `github.io` address reveals nothing about the private network's naming.

## Updating

Edit the files in the local clone, rerun the privacy check on anything new (especially PDFs), then commit and push. GitHub Pages republishes within a minute or two.

```bash
git add -A
git commit -m "Update portfolio"
git push
```

## Planned

- A CCNA card on the session page once the certification is earned.
