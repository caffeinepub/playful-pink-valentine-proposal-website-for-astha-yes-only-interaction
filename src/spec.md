# Specification

## Summary
**Goal:** Build a single-page, pink, playful Valentine proposal website for Astha with a “Yes-only” interaction and a celebratory acceptance experience that is saved and displayed via a backend.

**Planned changes:**
- Create a single-page UI with consistently pink, fun Valentine styling and English-only copy, prominently featuring the name “Astha”.
- Implement a proposal interaction flow that leads only to acceptance (“Yes”), with no reachable denial/rejection state (any “No” element, if present, cannot result in rejection).
- Add a “Yes” success state with cute celebratory animation (e.g., hearts/confetti), a romantic confirmation message addressing Astha, and an optional follow-up prompt that stays within the Yes-only flow.
- Add backend persistence to record acceptance (timestamp + optional short note) and a query to fetch the latest acceptance record and/or acceptance count for display on the success screen.
- Add and reference generated static Valentine-themed images from frontend public assets, including at least one hero image and one decorative/sticker element elsewhere.

**User-visible outcome:** A single-page Valentine proposal for Astha that feels pink and playful, lets her accept with “Yes” (with no effective way to deny), celebrates the acceptance, and shows that the acceptance was saved (time and/or count).
