const GoogleMap = ({ src, height = 130 }: { src: string, height?: number }) => (
    <div className="w-full rounded-lg">
        <iframe
            src={src}
            loading="lazy" 
            allowFullScreen
            width="100%" height={height}
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
        />
    </div>
);

export default GoogleMap;