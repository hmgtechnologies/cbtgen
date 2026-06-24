# HMG CBT Platform Generator

A free browser-based generator that creates branded, ready-to-upload CBT platform ZIP packages for clients.

## What it does

Enter client details such as school name, platform name, contact details, Supabase URL/key and admin email. The generator produces a ZIP containing a full CBT platform based on the HMG Academy CBT Pro architecture.

Generated platforms include:

- Teacher Dashboard
- Student Exam Portal
- Admin Panel
- Certificate Verification
- 17 question types
- Expanded exam types such as admission screening, common entrance, scholarship tests, recruitment/aptitude tests, certification exams, STEM exams, UTME/JAMB practice and WAEC/NECO/BECE practice
- Supabase SQL backend setup
- SaaS-ready institutions and audit logs
- SEO files: robots.txt, sitemap.xml, llms.txt, metadata
- PWA install support
- Result/certificate printing
- No paid AI API

## Output modes

### Traditional mode

Generates files at repository root. Upload directly to GitHub, Vercel, Cloudflare Pages or GitHub Pages.

### Modern mode

Generates the same platform plus:

- `package.json`
- `scripts/build.mjs`
- `MODERN_BUILD_README.md`

Run:

```bash
npm run build
```

Then deploy the generated `dist/` folder.

## Privacy

The generator runs in the browser. Client details are not sent to a server. ZIP generation happens locally in the browser.

## Security

Only use the Supabase anon/public key. Never use a Supabase service-role key in generated frontend files.

## Built by

HMG Concepts / HMG Academy ecosystem.

- HMG Concepts: https://hmgconcepts.pages.dev/
- HMG Academy: https://hmgacademy.pages.dev/
- WhatsApp: https://wa.me/2348100866322
