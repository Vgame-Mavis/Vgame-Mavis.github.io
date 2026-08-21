# VGAME Independent Product Portfolio

English-only static website for private product introductions and client communication. It is intentionally presented as an independent portfolio and not as VGAME's official corporate website.

## Free hosting and content management

- Frontend hosting: GitHub Pages (free for a public repository on GitHub Free).
- Content management: Pages CMS hosted app (free and open source).
- Sign-in: the repository owner's GitHub account.
- Editable content: site name, professional role, hero copy, products, product visibility, personal contact details and form delivery endpoint.

## Safety for personal contact information

The contact details confirmed by the owner are stored in `site.json` and can be changed through Pages CMS. The location field is intentionally blank and is not displayed.

## Inquiry form

`contact.html` follows a structured B2B inquiry flow with subject, project requirements, company, country or region, business type, buyer contact, product interest, quantity and an optional reference file. It currently posts to the free FormSubmit endpoint for `vgame.mvs@gmail.com`.

The first live submission triggers a FormSubmit activation email. The website owner must approve that email before normal inquiry delivery begins. Do not test the live form with real customer data before activation and privacy review.

## Local preview

Run any static file server in this folder, then open its local address. Fetch-based content does not load correctly when `index.html` is opened directly from the filesystem.

## Free deployment

1. Create a public GitHub repository and upload every file in this folder.
2. In GitHub: Settings → Pages → Deploy from a branch → `main` / root.
3. Visit `https://app.pagescms.org/`, sign in with GitHub and grant access only to this repository.
4. Open the repository in Pages CMS. The included `.pages.yml` provides the Site Settings and Products editing screens.
5. A CMS save commits the changed JSON file to GitHub; GitHub Pages then republishes the site.

The selected GitHub identity is `Vgame-Mavis`. See `GITHUB-PAGES-SETUP.md` for the exact repository name and publishing checklist.

## External product links

- Product marketplace: https://v-game.en.alibaba.com/
- A YouTube channel or video may be added only after its exact URL is confirmed by the owner.
- Pages CMS documentation: https://pagescms.org/docs/
- GitHub Pages documentation: https://docs.github.com/pages

## Media note

The public pages use original CSS-based graphics and do not load images or product links from other VGAME websites. Product buttons lead to this website's own inquiry form. External product links are limited to Alibaba.com and a future owner-approved YouTube URL.
