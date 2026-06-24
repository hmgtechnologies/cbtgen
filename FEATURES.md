# Generator Features

## Client branding

- Client name
- Platform name
- Short app name
- Brand colours
- Contact details
- Admin email
- Generated SVG logo
- SEO description

## Full platform generation

The generator creates a complete branded CBT platform package containing:

- index/landing page
- teacher dashboard
- student portal
- admin panel
- certificate verification
- feature guide
- deployment validator
- SQL setup
- PWA files
- SEO files
- documentation

## Fullstack/SaaS backend

Generated SQL includes:

- Supabase Auth profile integration
- exams table
- results table
- students table
- institutions table
- audit_logs table
- RLS policies
- RPC functions
- certificate verification
- result submission RPC
- admin RPCs

## Traditional and modern output

### Traditional

Direct static upload to GitHub/Vercel/Cloudflare/GitHub Pages.

### Modern

Adds `package.json` and a zero-dependency build script to copy the generated static platform to `dist/`.

## Enterprise features in generated platforms

- 17 question types
- admission screening
- scholarship tests
- common entrance exams
- recruitment/aptitude tests
- certification exams
- STEM exams
- UTME/JAMB practice
- WAEC/NECO/BECE practice
- anti-cheat controls
- optional proctoring
- Math/Science keyboard
- student question navigator hide/show
- teacher result/certificate printing
- bulk result/certificate printing
- certificate verification
- SEO/PWA/lead generation

## No paid AI API

The generated platform does not call paid AI APIs. `PROMPT_TEMPLATE.md` helps teachers manually generate CSV question banks using any assistant if desired.
