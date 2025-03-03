import { ThemeToggle } from "@/components/ui/theme-toggle";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      {/* Add ThemeToggle button to test */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Add the sample image */}
      <div className="mt-8">
        {/* <Image
          src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
          alt="Sample Image"
          width={400}
          height={300}
          unoptimized // Add this to bypass Next.js image optimization
        /> */}
      </div>
    </div>
  );
}
