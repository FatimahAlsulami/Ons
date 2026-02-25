export default function Icon3D({ src, alt="", size=28, children }){
  return (
    <span className="icon3d" style={{ width:size, height:size }}>
      {children ? children : <img src={src} alt={alt} />}
    </span>
  );
}
