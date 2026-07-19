export default function VideoEmbed({
  url,
  title = 'Video',
}: {
  url: string;
  title?: string;
}) {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
