# Deployment Guide — HMG CBT Platform Generator

## Deploying the generator itself

The generator is a static website.

### GitHub Pages

1. Upload the contents of `CBT generator/` to a GitHub repository.
2. Enable GitHub Pages.
3. Open the published URL.
4. Ensure `templates/base/template-manifest.json` loads publicly.

### Vercel

1. Import the generator repository in Vercel.
2. Framework preset: Other / Static.
3. Build command: empty.
4. Output directory: root.
5. Deploy.

### Cloudflare Pages

1. Connect repository.
2. Framework preset: None.
3. Build command: empty.
4. Output directory: root.
5. Deploy.

## Using the generator

1. Open `index.html` in the deployed generator.
2. Enter client/school details.
3. Enter Supabase URL and anon key if already created.
4. Choose output type:
   - Traditional static upload
   - Modern npm/build workflow
5. Click `Generate CBT Platform ZIP`.
6. Download ZIP.
7. Extract ZIP into the client repository.
8. Run `COMPLETE_SQL_SETUP.sql` in the client Supabase project.
9. Deploy the generated client platform.
10. Open `/deployment_validator.html` on the client platform.

## Client platform deployment

### Traditional output

Upload generated files directly to repository root and deploy.

### Modern output

Run:

```bash
npm run build
```

Deploy the `dist/` folder.

## Required Supabase setup for generated platform

1. Create Supabase project.
2. Copy `COMPLETE_SQL_SETUP.sql` from generated package.
3. Run it in Supabase SQL Editor.
4. Create an admin/teacher account.
5. Approve/activate the teacher/admin profile if required.
6. Test teacher → exam → student → result → certificate.

## SEO setup

After client deployment:

1. Verify `/robots.txt`.
2. Verify `/sitemap.xml`.
3. Submit sitemap to Google Search Console and Bing Webmaster Tools.
4. Share landing page links on HMG Concepts, HMG Academy and client channels.

## PWA setup

The generated platform is installable. Test on:

- Android Chrome
- iPhone Safari
- Desktop Chrome/Edge

## No paid AI API

Generated platforms contain no runtime AI API integration. Prompt templates are manual question-generation aids only.
