# Wishlist

This is a wish list, which can be used for various use cases like birthdays, christmas or baby parties.

<p align="center">
  <img src="./public/wishlist.svg" width="200" title="Wishlist">
</p>

![CI](https://github.com/gylxan/wishlist/actions/workflows/main.yml/badge.svg)
## Getting started

Copy-paste the `.env.example` in the project to `.env`

```sh
cp .env.example .env
```

Afterward configure the `.env` file with your needs

```dotenv
# Title of your site
NEXT_PUBLIC_SITE_TITLE=Baby Wunschliste
# Title used for the greeting card
NEXT_PUBLIC_TITLE=Endlich es es so weit! 🎉
# Person of the event for the greeting card
NEXT_PUBLIC_NAME=Baby
# Event name for the greeting card
NEXT_PUBLIC_REASON=Geburt
# Date of the event for the greeting card
NEXT_PUBLIC_DATE=2024-01-22
# Description of the event
NEXT_PUBLIC_DESCRIPTION="Wir feiern gemeinsam die Babyparty von mir! Hier ist eine Wunschliste um alles zu vereinfachen!"
# Background image for the dark mode
NEXT_PUBLIC_BACKGROUND_IMAGE_DARK=https://static.vecteezy.com/system/resources/previews/022/740/188/original/free-jungle-background-forest-nature-scene-futuristic-generative-ai-free-photo.jpg
# Background image for the light mode
NEXT_PUBLIC_BACKGROUND_IMAGE_LIGHT=https://img.freepik.com/free-photo/empty-sea-beach-background_74190-4002.jpg?w=2000
# E-Mail address to access the admin view
NEXT_ADMIN_MAIL="admin@guidolange.dev"
# Password to access the admin view
NEXT_ADMIN_PASSWORD="test123"
# Secret used for authentication
NEXTAUTH_SECRET=mysecret123
# URL for authentication redirect
NEXTAUTH_URL=http://localhost:3000
```

## Scripts

### Develop
Start the local development environment

```
npm run dev
```

### Build
Build the project

```
npm build
```

### Start
Start the project (Must be built first)

```
npm start
```

### Lint
Lints the project

```
npm run lint
```

### Prettier

Run prettier

```
npm run prettier
```
