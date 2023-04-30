export default function UserIcon({ svgString }: { svgString: string }) {
  return <div dangerouslySetInnerHTML={{ __html: svgString }} style={{ width: "3em" }} />;
}
