export default function GlowBackground() {
  // The dashboard gradient + top sheen are baked into the `.bg-dashboard`
  // background paint (see globals.css). No blurred DOM layer and no animation,
  // so this costs essentially nothing to composite.
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-dashboard" />
  );
}
