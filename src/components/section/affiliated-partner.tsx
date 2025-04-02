import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import uni1 from "@/assets/uni1.webp"
import uni2 from "@/assets/uni2.webp"
import uni3 from "@/assets/uni3.webp"
import uni4 from "@/assets/uni4.webp"
import { StaticImageData } from "next/image";
import Image  from "next/image";

const reviews = [
  {

    img: uni1,
  },
  {
    img: uni2,
  },
  {
   
    img: uni3,
  },
  {
  
    img: uni4,
  },
  {
    img: uni1,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
}: {
  img: StaticImageData| string;

}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full"  alt="" src={img} />
      </div>
    </figure>
  );
};

export function AffiliateSection() {
  return (
    <div className="container mx-auto space-y-8 relative flex w-full flex-col mt-14 items-center justify-center overflow-hidden">
        <div className="space-y-3">
        <h2 className="md:text-4xl font-semibold text-3xl text-center ">Our <span className="text-primary">Affiliations</span></h2>
        <p className="text-gray-500">See The List of Our Affiliated <span className="text-secondary">Colleges</span>.</p>
        </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review,index) => (
          <ReviewCard key={index} img={review.img} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review,index) => (
          <ReviewCard key={index} img={review.img} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
