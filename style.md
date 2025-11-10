## Viettel MiniApp Styling Guide

### 1. Brand Essence
- **Tone**: Confident, modern, trustworthy. Always prioritise clarity and legibility.
- **Layout**: Clean white surfaces with purposeful red accents and generous breathing space.
- **Imagery**: Prefer vector illustrations or product screenshots framed with rounded corners and Viettel red highlights.

### 2. Core Palette
- **Primary**: Viettel Red `#E60028` (digital). Used for CTAs, key metrics, icons, and focus states.
- **Neutrals**:
  - Viettel Black `#0E0E0E` – high-impact accents (iconography, rare emphasis). Use sparingly.
  - Charcoal Grey `#44494D` – default text colour, neutral icons, dividers at full opacity.
  - Medium Grey `#B5B4B4` – subtle strokes, form outlines, disabled elements (40–60% opacity in UI).
  - Light Grey `#F2F2F2` – application background and neutral cards.
- **Usage Ratios**:
  - **Option 1 – Red dominant**: 60% red / 30% white & light grey / 10% charcoal accents. Use for hero moments or marketing surfaces.
  - **Option 2 – Balanced**: 25% red / 55% white / 20% neutral greys. Recommended for dashboards and documentation.
  - **Option 3 – Accent only**: 10% red / 70% white / 20% neutral greys. Ideal for dense content or data-heavy screens.

### 3. Typography
- **Primary font**: `Be Vietnam Pro` (Weight 400–700). Fallbacks: `Helvetica Neue`, `Helvetica`, `Arial`, `sans-serif`.
- **Headings**: Semibold (600–700). Tight leading (105–110%). Primary hero titles use Viettel Red.
- **Body text**: Regular (400) for paragraphs, Medium (500) for labels and buttons.
- **Case**: Use uppercase with wide tracking on section labels and navigation (`tracking-[0.2–0.35em]`). Avoid all caps in body copy.

### 4. Components & Patterns
- **Buttons**: Solid `#E60028` background, white text, 12–16px radius, medium weight. Hover darkens to `#B8001E`. Outline versions use 1px Viettel red border with white fill.
- **Cards**: Rounded 20–24px corners, subtle border `rgba(181, 180, 180, 0.4)`, elevated shadow `0 16px 48px rgba(0, 0, 0, 0.08)`. Headers may use red gradients (primary) or neutral surfaces (secondary).
- **Badges/Chips**: Red text on soft red background (`rgba(230, 0, 40, 0.1)`) with uppercase, tracked text.
- **Forms**: Light grey background capsules with white inputs. Focus rings use Viettel red.
- **Icons**: Outline icons in white when placed on red surfaces; charcoal grey when on white.

### 5. Spacing & Layout
- Base unit 8px. Common paddings: 24px cards, 64px sections.
- Max content width 1200px (`max-w-6xl`).
- Maintain generous white space around hero copy and CTAs.

### 6. Motion & Interaction
- Use smooth 200ms transitions for hover/press states.
- Hover states translate cards upward by 4–6px and intensify shadows.
- Focus states must include a 2px red outline to support accessibility.

### 7. Accessibility
- Minimum contrast ratio 4.5:1 for text. Red on white passes at 18pt+ weight; use charcoal or black for body text on light surfaces.
- Provide Vietnamese and English copy where relevant; ensure search placeholders and helper text remain bilingual when possible.

### 8. Asset Notes
- Logos stay white when placed on red backgrounds; use Viettel red symbol on light backgrounds only.
- Avoid gradients outside predefined red spectrum (#E60028 to #940018). Neutrals remain flat.

Refer to this guide before introducing new screens or components to keep the experience aligned with Viettel’s digital identity.

