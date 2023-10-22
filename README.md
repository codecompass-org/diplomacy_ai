# diplomacy
a diplomacy game server as well as potential clients including mobile/web/etc.

# TODO

- [x] Army Asset
- [x] Fleet Asset
- [ ] Move lines on map
- [ ] convoy lines on map
- [ ] support lines on map
- [x] Add labels to map
- [ ] add coasts to map
- [ ] combine territories with multiple svg paths (Denmark)
- [ ] fix firebase storage path to include game ID and user ID
- [ ] fix order entry to continuously update orders instead of making new ones
- [ ] add chat feature
- [ ] add game queue page
- [ ] update adjudicator to read from firebase
- [ ] update adjudicator to update orders/game in firebase
- [ ] game model: turn length, next adjudication time, players, current year, ...
- [ ] add firebase function to kick off adjudicator
- [ ] add missing sea above Denmark


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
