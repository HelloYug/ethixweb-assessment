# Ethixweb India: The Signal

Ethixweb India is a cinematic, mobile-first digital growth experience for Indian businesses, with a Supabase-backed enquiry workflow and protected lead desk.

The public experience is ready to run locally or deploy. Lead persistence, spam verification and admin authentication fail safely until their environment variables are configured.

## Stack

- Next.js App Router, React and JavaScript
- Semantic JSX with global design tokens and scoped-ready component structure
- Next.js Route Handlers with Node.js runtime
- Supabase PostgreSQL, Auth and RLS
- `@supabase/ssr`, `@supabase/supabase-js` and Zod
- Cloudflare Turnstile, honeypot and PostgreSQL-backed rate limiting
- Netlify-ready deployment via `@netlify/plugin-nextjs`

The current Supabase packages recommend Node 22 or later. The local environment used for this build is Node 20.20.2; the production build still completed successfully, but deployment should use Node 22.

## Features

- Public routes: `/`, `/services`, `/industries`, `/our-work`, `/about`, `/insights`, `/contact`, `/web-development`, `/ai-automation`, `/marketing` and policy pages. `/blog` remains a compatibility redirect to `/insights`.
- Service-aware contact links such as `/contact?service=web`
- Client and server validation with safe structured errors
- Server-side Turnstile verification and honeypot handling
- HMAC-keyed PostgreSQL rate limiter
- Supabase Auth login at `/admin/login`
- Approved-admin lead list at `/admin`
- Search, status filter, lead detail, status updates, internal notes and logout
- Responsive navigation, reduced-motion support, keyboard focus states and error announcements
- Signal-network hero with animated SVG pathways and node pulses
- Capability marquee, scroll progress indicator and editorial signal narrative
- India-specific operating-system section with interactive experience, demand, intelligence and operations layers
- Custom fine-pointer cursor with contextual labels, magnetic CTAs, route curtains, spotlight cards and scroll reveals
- React Bits-inspired motion layer with ghost cursor trails, click sparks, ambient glow, pointer spotlights, glare sweeps and a reactive spider-web signal field
- Inline SVG icon system with reduced-motion and touch fallbacks
- Selected work presented with clear context and honest labeling

## India-specific rationale

The design uses the approved Ethixweb red/dark identity but changes the first-screen story to **Global expertise. Built for Indian ambition.** The use cases focus on Indian SMEs, D2C brands, local service businesses, startups and regional B2B teams without inventing clients or results. The form includes +91 guidance and is intentionally short for mobile completion.

The About page references the India connection published in Ethixweb’s privacy policy: Ethixweb India Private Limited in New Delhi is named as an associated entity delivering design, development, marketing and support work.

Portfolio imagery is labeled **Selected global work**, while India-specific use cases focus on real operating contexts such as local discovery, mobile journeys and human follow-up.

## Improvements over the original site

- Task-focused primary navigation with a clear project CTA.
- India-oriented positioning without flag-color shorthand or unsupported claims.
- A cinematic visual system with a CSS/SVG operational-connectivity diagram instead of heavy 3D.
- A motion language built from GPU-friendly transforms, opacity, SVG dash flow and reduced-motion fallbacks.
- Mobile-first enquiry flow with service preselection and accessible states.
- Real lead persistence and protected admin workflow rather than a presentation-only contact form.
- Server-side authorization, RLS, structured API errors and fail-closed external configuration.

## Local setup

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The project builds without secrets, but lead submission and admin authentication remain unavailable until the server environment is configured. This is intentional; the app does not fake success or use localStorage as a database.

## Environment variables

See `.env.example`:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
RATE_LIMIT_HMAC_SECRET
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY` or `RATE_LIMIT_HMAC_SECRET` through a `NEXT_PUBLIC_` variable.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/setup.sql` in the SQL editor or through the Supabase CLI. This single idempotent file includes the complete schema, security policies, rate-limit function and current service catalog. The numbered files in `supabase/migrations/` remain available as migration history.
4. Create an email/password user in Supabase Auth; do not add a public signup flow.
5. Approve that user by running `insert into public.admin_users (user_id) values ('AUTH_USER_UUID');` with the real UUID in the SQL editor.
6. Add the environment variables to `.env.local` and the Netlify site settings.
7. Create a Turnstile widget for localhost and the deployed domain, then configure both Turnstile variables.

## Security model

The public API validates and constructs its own insert payload. It verifies Turnstile server-to-server, rejects the honeypot, applies a PostgreSQL-backed rate limit and inserts through a server-only Supabase client. Public direct table insertion is denied. Security headers are applied globally, and browser capabilities are restricted by policy.

Admin routes verify the Supabase session, require an active row in `admin_users`, and query/update through an RLS-protected session-aware client. Only `status` and `internal_notes` are updateable by the authenticated database role; the database trigger owns `updated_at`.

## Testing and build

```bash
npm run test
npm run build
```

The focused tests cover the shared service allow-list and API-independent validation behavior. See `docs/BACKEND_VERIFICATION.md` for the complete manual API, Supabase and admin checklist. Real persistence, Turnstile and admin tests require external credentials and are not claimed until exercised against a configured project.

The verified local production build completes successfully with `npm run build`. The build output includes the public pages, protected admin routes and dynamic lead APIs listed above. The browser preview was also exercised on mobile-sized viewport rendering, navigation, menu state, system-layer tabs and signal-node state.

## Deployment

Create a Netlify site from this repository. The included `netlify.toml` uses `npm run build`, publishes `.next`, and enables `@netlify/plugin-nextjs`. Set the environment variables for Deploy Previews and Production, deploy, then update Turnstile hostnames with the final Netlify/custom domain. Verify direct navigation to every public route, `/admin` redirect behavior, a real lead insertion, admin status/note persistence and logout.

## Known limitations

- No Supabase, Turnstile or Netlify credentials were available in the implementation workspace, so the real persistence path is prepared but not externally verified.
- The local preview was smoke-tested visually at desktop size and structurally across `/`, `/services`, `/about`, `/contact`, `/admin` and `/admin/login`; a deployed PageSpeed run is still required for measured performance evidence.
- No PageSpeed score is claimed without a deployed URL.
- Portfolio assets should be used only with the appropriate brand permission.
- No GitHub repository or deployment URL is claimed from this local build.

## Content basis

Brand assets and selected work images are included in the public asset set. Company capabilities and the India connection are based on published Ethixweb website and privacy-policy statements. India-specific messaging is written for Indian businesses, audiences and operating realities.
