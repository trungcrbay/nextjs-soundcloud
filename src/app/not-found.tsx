import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{display:'block', margin:' 0 auto', width:'800px'}}>
      <img width={800} src="400.gif" />
      <div style={{display:'block', margin:' 0 auto', width:'600px'}}>
        <h2>Not Found Not FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot FoundNot Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
