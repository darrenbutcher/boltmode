import { useState } from 'react'
import NextHead from 'next/head'

const software = [
  {
    id: 'capture-log',
    name: 'Capture Log',
    tagline: 'Where operational photos become reports.',
    description:
      'Built for operational teams that rely on photo documentation across sites, products and incidents. Photos are captured on mobile inside the activity they belong to, stay grouped with their context, and turn into structured reports in minutes.',
    platform: 'iOS, Android and web',
    url: 'https://capturelog.xyz',
    domain: 'capturelog.xyz',
  },
  {
    id: 'referral-card',
    name: 'Referral Card',
    tagline: 'Referrals with context. When the why matters.',
    description:
      "Most referrals show up as a name and a link. Referral Card turns them into personal recommendations, capturing what the referrer knows about the person's situation. That context stays with the referral, so your team understands the opportunity before the first conversation.",
    platform: 'Web',
    url: 'https://referralcard.co',
    domain: 'referralcard.co',
  },
]

const brands = [
  {
    id: 'daw-people',
    name: 'Daw People',
    tagline: 'Print art for musicians and producers.',
    description:
      'Art prints for the studio wall, designed around the tools, sounds and culture of making music. Made for producers, beatmakers and anyone who spends their nights in a DAW.',
    platform: 'Online store',
    url: 'https://dawpeople.shop',
    domain: 'dawpeople.shop',
  },
]

const steps = [
  {
    title: 'Understand',
    body: 'Start with the problem, the people it affects, and what success should look like.',
  },
  {
    title: 'Build',
    body: 'Work in short, focused iterations with priorities and trade-offs kept visible.',
  },
  {
    title: 'Improve',
    body: 'Let real usage and feedback shape what comes next, well after launch.',
  },
]

const services = [
  {
    title: 'Product strategy',
    body: 'Clarify the opportunity, users, scope and technical direction before committing to a build.',
  },
  {
    title: 'SaaS development',
    body: 'Web and mobile applications built on foundations that can grow past a first version.',
  },
  {
    title: 'Ecommerce builds',
    body: 'Storefronts, product catalogs and checkout flows, informed by running our own stores.',
  },
]

function Logo() {
  return (
    <>
      <span className="font-black">boltmode</span>
      <span className="font-medium text-signal">labs</span>
    </>
  )
}

function Venture({ venture, accent }) {
  const isSignal = accent === 'signal'
  return (
    <article
      id={venture.id}
      className="grid gap-6 border-b border-line py-12 md:grid-cols-venture md:gap-16"
    >
      <div>
        <h4 className="text-3xl font-black tracking-title">{venture.name}</h4>
        <p
          className={`mt-3 text-xl leading-snug font-medium ${
            isSignal ? 'text-signal' : 'text-iris'
          }`}
        >
          {venture.tagline}
        </p>
      </div>
      <div>
        <p className="text-lg leading-relaxed text-muted">
          {venture.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="rounded-full border border-line px-3 py-1 text-muted">
            {venture.platform}
          </span>
          <a
            href={venture.url}
            className={`font-bold text-bone focus-ring ${
              isSignal
                ? 'link-signal hover:text-signal'
                : 'link-iris hover:text-iris'
            }`}
          >
            Visit {venture.domain}
          </a>
        </div>
      </div>
    </article>
  )
}

function VentureGroup({ title, subtitle, accent, ventures, className }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 border-b border-line pb-4">
        <span
          className={`w-2 h-2 rounded-full ${
            accent === 'signal' ? 'bg-signal' : 'bg-iris'
          }`}
          aria-hidden="true"
        />
        <h3 className="font-bold">{title}</h3>
        <span className="text-sm text-muted">{subtitle}</span>
      </div>
      {ventures.map((venture) => (
        <Venture key={venture.id} venture={venture} accent={accent} />
      ))}
    </div>
  )
}

function SignupForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  // TODO: connect to your email provider (Loops, ConvertKit, Beehiiv, Resend, etc.)
  function handleSubmit(e) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:rounded-full sm:border sm:border-line sm:bg-charcoal sm:p-1.5 sm:focus-within:border-signal">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-line bg-charcoal px-5 py-3 text-bone placeholder-muted outline-none focus:outline-none focus:ring-0 focus:border-signal sm:border-0 sm:py-2.5"
        />
        <button
          type="submit"
          className="flex-shrink-0 rounded-full bg-signal px-5 py-3 font-bold text-charcoal hover:bg-bone focus-ring sm:py-2.5"
        >
          Subscribe
        </button>
      </div>
      <p
        className={`mt-3 min-h-6 px-2 text-sm ${
          status === 'error'
            ? 'text-iris'
            : status === 'success'
            ? 'text-signal'
            : 'text-muted'
        }`}
        role="status"
        aria-live="polite"
      >
        {status === 'error' &&
          'Enter a valid email address, like name@company.com.'}
        {status === 'success' &&
          "You're subscribed. We'll be in touch when there's something worth sharing."}
      </p>
    </form>
  )
}

function Home() {
  return (
    <>
      <NextHead>
        <meta
          name="description"
          content="Boltmode Labs is a product studio that builds and operates its own SaaS products and ecommerce brands, and works with selected businesses on software and product projects."
        />
      </NextHead>

      {/* Header */}
      <header className="site-header sticky z-30 border-b border-line border-opacity-80">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
          aria-label="Main"
        >
          <a href="#" className="text-logo tracking-title focus-ring">
            <Logo />
          </a>
          <div className="hidden items-center gap-8 text-nav text-muted md:flex">
            <a href="#ventures" className="hover:text-bone">
              Ventures
            </a>
            <a href="#studio" className="hover:text-bone">
              Studio
            </a>
            <a href="#businesses" className="hover:text-bone">
              For businesses
            </a>
            <a href="#updates" className="hover:text-bone">
              Updates
            </a>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-signal hover:text-signal focus-ring"
          >
            Contact
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="grid-bg pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pt-20 pb-24 sm:px-8 sm:pt-28 lg:grid-cols-hero lg:items-end lg:gap-20">
            <div>
              <p className="text-sm font-medium text-signal">Product studio</p>
              <h1 className="mt-5 text-hero leading-none font-black tracking-display sm:text-7xl lg:text-hero-lg">
                Software for businesses.
                <br />
                <span className="text-muted">Brands for people.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                Boltmode Labs builds and operates its own SaaS products and
                ecommerce brands. We also work with a small number of companies
                on software and product projects.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#ventures"
                  className="rounded-full bg-signal px-5 py-3 font-bold text-charcoal hover:bg-bone focus-ring"
                >
                  See our ventures
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-line px-5 py-3 font-medium hover:border-bone focus-ring"
                >
                  Start a conversation
                </a>
              </div>
            </div>

            {/* Venture index */}
            <aside
              className="rounded-xl border border-line bg-panel bg-opacity-80 p-2 backdrop-blur"
              aria-label="Venture index"
            >
              <p className="px-4 pt-3 pb-2 text-sm text-muted">
                Currently building
              </p>
              <ul className="text-nav">
                {[...software, ...brands].map((venture) => (
                  <li key={venture.id}>
                    <a
                      href={`#${venture.id}`}
                      className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-line hover:bg-opacity-60"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            brands.includes(venture) ? 'bg-iris' : 'bg-signal'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="font-bold">{venture.name}</span>
                      </span>
                      <span className="text-sm text-muted">
                        {brands.includes(venture) ? 'Ecommerce' : 'SaaS'}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Ventures */}
        <section id="ventures" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="text-4xl font-black tracking-heading sm:text-5xl">
                What we&apos;re building
              </h2>
              <p className="max-w-sm leading-relaxed text-muted">
                Everything below is built and operated by Boltmode Labs, across
                two areas.
              </p>
            </div>

            <VentureGroup
              className="mt-16"
              title="Business software"
              subtitle="SaaS applications for specific operational workflows"
              accent="signal"
              ventures={software}
            />
            <VentureGroup
              className="mt-20"
              title="Consumer brands"
              subtitle="Direct-to-consumer ecommerce, run end to end"
              accent="iris"
              ventures={brands}
            />

            <p className="mt-10 text-muted">
              More in development across both areas.
            </p>
          </div>
        </section>

        {/* Studio / approach */}
        <section id="studio" className="border-t border-line bg-panel">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <h2 className="text-4xl font-black tracking-heading sm:text-5xl">
                Two areas,
                <br />
                one way of working.
              </h2>
              <p className="text-lg leading-relaxed text-muted lg:pt-3">
                Business software and consumer ecommerce look different on the
                surface, but the work underneath is the same: understand who
                it&apos;s for, build something focused, and keep improving it
                based on how people actually use it. Running products on both
                sides gives us a practical view of how customers buy and how
                teams work.
              </p>
            </div>

            <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="bg-panel p-7">
                  <span className="text-sm font-bold text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* For businesses */}
        <section id="businesses" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-business lg:gap-20">
            <div>
              <h2 className="text-4xl font-black tracking-heading sm:text-5xl">
                For businesses
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Alongside our own ventures, we take on a limited number of
                projects with businesses that need software or an online store
                built around a specific workflow or opportunity.
              </p>
            </div>
            <dl className="divide-y divide-line border-t border-b border-line">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="grid gap-2 py-6 sm:grid-cols-service sm:gap-8"
                >
                  <dt className="text-lg font-bold">{service.title}</dt>
                  <dd className="leading-relaxed text-muted">{service.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Mailing list */}
        <section id="updates" className="px-5 sm:px-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-signal border-opacity-30 bg-panel">
            <div
              className="grid-bg pointer-events-none absolute inset-0 opacity-70"
              aria-hidden="true"
            />
            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-signup lg:items-center lg:gap-16">
              <div>
                <h2 className="text-3xl font-black tracking-title sm:text-4xl">
                  Follow along as we build.
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
                  Occasional updates on new products, launches and what
                  we&apos;re learning along the way. No spam, and you can
                  unsubscribe anytime.
                </p>
              </div>
              <SignupForm />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
            <h2 className="max-w-3xl text-4xl font-black tracking-heading sm:text-6xl">
              Have a product or project worth exploring?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Tell us what you&apos;re building, what you&apos;re trying to
              solve, or where you see an opportunity. We&apos;ll start with the
              problem, not a predetermined solution.
            </p>
            <a
              href="mailto:hello@boltmode.co"
              className="link-signal link-lg mt-10 inline-block text-2xl font-black tracking-brand hover:text-signal focus-ring sm:text-4xl"
            >
              hello@boltmode.co
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 text-sm sm:px-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg tracking-title">
              <Logo />
            </p>
            <p className="mt-3 max-w-xs leading-relaxed text-muted">
              A product studio building SaaS products and ecommerce brands.
            </p>
          </div>
          <div>
            <p className="font-bold">Ventures</p>
            <ul className="mt-3 space-y-2 text-muted">
              {[...software, ...brands].map((venture) => (
                <li key={venture.id}>
                  <a href={venture.url} className="hover:text-bone">
                    {venture.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold">Company</p>
            <ul className="mt-3 space-y-2 text-muted">
              <li>
                <a href="mailto:hello@boltmode.co" className="hover:text-bone">
                  hello@boltmode.co
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-bone">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-bone">
                  Terms of use
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl border-t border-line px-5 py-6 text-sm text-muted sm:px-8">
          © 2026 Boltmode Labs LLC
        </div>
      </footer>
    </>
  )
}

// The landing page renders its own header and footer instead of MainLayout.
Home.getLayout = (page) => page
Home.title = 'Boltmode Labs — Product studio'
export default Home
