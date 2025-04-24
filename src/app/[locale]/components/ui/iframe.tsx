const Iframe = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className="rounded-md overflow-hidden relative">
      <div className="w-full h-full bg-main-bg animate-pulse absolute left-0 top-0 -z-10"></div>
      <iframe
        src={url}
        width="100%"
        height="300"
        style={{ border: "none", opacity: 1 }}
        title={title}
        className="w-full h-[300px]"
      />
    </div>
  );
};

export default Iframe;
