# UI Improvement Design — AskArgus

**Date:** 2026-04-18  
**Scope:** Auth pages, Chat interface, Sidebar/Navigation  
**Style direction:** Split-screen auth + glassmorphism chat + refined spacing + dark-first neon accent (Options A+B+C combined)

---

## 1. Auth Pages

### Layout
- Split-screen: left 40% brand panel, right 60% form panel
- Left panel: animated gradient background (`#059669 → #7c3aed → #0f172a`), AskArgus logo, tagline, subtle CSS mesh animation
- Right panel: centered frosted-glass card on `bg-gray-950` dark / `bg-gray-50` light

### Files to change
- `client/src/components/Auth/AuthLayout.tsx` — restructure into two-column flex layout
- `client/src/components/Auth/LoginForm.tsx` — input/button polish
- `client/src/components/Auth/Registration.tsx` — same input treatment as LoginForm
- `client/src/style.css` — add `@keyframes gradient-shift` and `@keyframes mesh-move` animations

### Input fields
- `rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm` in dark
- `focus:ring-2 focus:ring-green-500/50 focus:border-green-500` glow on focus
- Floating label pattern preserved (already implemented)

### Submit button
- Gradient fill: `bg-gradient-to-r from-green-600 to-emerald-500`
- Shimmer hover: `hover:from-green-500 hover:to-emerald-400 transition-all duration-300`
- Height stays `h-12 rounded-xl`

### Typography
- Header: `text-2xl font-bold tracking-tight`
- Labels: `text-sm font-medium text-text-secondary`

---

## 2. Chat Interface

### Header (`client/src/components/Chat/Header.tsx`)
- Add `backdrop-blur-md border-b border-border-light/40` to header container
- Model selector pill: `bg-surface-primary/80 rounded-lg px-2 py-1`
- Remove existing gradient background, replace with `bg-presentation/60 backdrop-blur-md`

### Message bubbles (`client/src/components/Chat/Messages/MessagesView.tsx` and message row components)
- Assistant: `bg-surface-primary/60 rounded-2xl px-4 py-3 shadow-sm`
- User: right-aligned, `bg-green-600/90 text-white rounded-2xl px-4 py-3`
- Max width: `max-w-[85%] md:max-w-[75%]`

### Input area (`client/src/components/Chat/Input/ChatForm.tsx`)
- Container: `rounded-2xl border border-border-light bg-surface-primary shadow-lg`
- Focus state: `focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500/50`
- Send button: filled green circle `bg-green-600 hover:bg-green-500 rounded-xl`

---

## 3. Sidebar / Navigation

### NavLink (`client/src/components/Nav/NavLink.tsx`)
- Add `hover:bg-surface-hover hover:text-text-primary transition-all duration-150`
- Active state: `border-l-2 border-green-500 bg-surface-active pl-[calc(0.625rem-2px)]`
- Icons: `opacity-70 group-hover:opacity-100 transition-opacity duration-150`

### Conversation list items
- Tighten to `px-2 py-1.5 rounded-lg`
- Hover: `hover:bg-surface-hover`
- Active: `bg-surface-active border-l-2 border-green-500`

### New Chat button (`client/src/components/Nav/NewChat.tsx`)
- Add `ring-1 ring-green-500/40 hover:bg-green-500/10 hover:ring-green-500/60`

### Bottom account strip
- Top `border-t border-border-light`
- Avatar chip: initials circle `bg-green-600/20 text-green-400 rounded-full`
- User name: `text-sm font-medium truncate`

---

## 4. Global Style Tokens (style.css additions)

```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Dark mode dual-accent: green primary, indigo secondary */
.dark {
  --ring-primary: var(--green-500);
  --ring-secondary: #6366f1; /* indigo-500 */
}
```

---

## 5. Constraints

- All text must remain wrapped in `useLocalize()` — no raw strings
- TypeScript strict — no `any`, no new `unknown` usage
- No new dependencies — use existing Tailwind tokens and CSS variables
- Accessibility: all interactive elements keep `aria-label`, `role`, focus rings
- All existing tests must continue to pass (style-only changes, no logic)
- Mobile breakpoints preserved (`md:`, `sm:` responsive classes retained)

---

## 6. Files Changed (summary)

| File | Change |
|---|---|
| `client/src/components/Auth/AuthLayout.tsx` | Split-screen layout, brand panel |
| `client/src/components/Auth/LoginForm.tsx` | Input/button polish |
| `client/src/components/Auth/Registration.tsx` | Same input treatment |
| `client/src/components/Chat/Header.tsx` | Backdrop blur, remove gradient |
| `client/src/components/Chat/Input/ChatForm.tsx` | Input container glow ring |
| `client/src/components/Nav/NavLink.tsx` | Hover/active states, icon opacity |
| `client/src/components/Nav/NewChat.tsx` | Ring + hover glow |
| `client/src/style.css` | Keyframe animations, dark dual-accent tokens |
