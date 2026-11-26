/**
 * Client testimonials shown on the /offer page. The section stays hidden
 * while this list is empty — add only real quotes you have permission to use.
 *
 * `quote` can be one string or a per-language object; missing languages fall
 * back to `en`, then to the first one given.
 *
 * Example:
 * {
 *   name: "Full Name",
 *   role: "Founder, Company",          // optional
 *   avatar: "/testimonials/name.webp", // optional, file in public/
 *   link: "https://linkedin.com/in/…", // optional
 *   project: "zukko-crm",              // optional, links to /projects/<id>
 *   quote: { uz: "…", ru: "…", en: "…" },
 * }
 */
export const TESTIMONIALS = []
