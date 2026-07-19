export default function SEOSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">{title}</h2>
        <div className="prose prose-sm max-w-none text-foreground/70 leading-relaxed">
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
}
