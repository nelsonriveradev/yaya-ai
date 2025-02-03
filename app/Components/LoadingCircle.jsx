import Image from "next/image";

export default function LoadingCircle(props) {
  return (
    <Image
      className="animate-spin"
      src="/Icons/icons8-loading.svg"
      width={props.width}
      height={props.height}
      alt="loaing icon"
    />
  );
}
