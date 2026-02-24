export default function Icon3D({ src, alt="", size=28 }){
  return (
    <span className="icon3d" style={{ width:size, height:size }}>
      <img src={src} alt={alt} />
    </span>
  );
}
