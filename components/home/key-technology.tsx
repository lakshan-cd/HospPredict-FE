import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import NeoImage from "@/public/bloom-visualisation.png"
import { Button } from "../ui/button"
import { EconomicIndicators } from "./key-technologies-sub-components/economic"
import { EconomicChart } from "./feature-section-sub-components/economic-chart"
import { NewsChart } from "./feature-section-sub-components/news-chart"
import { NewsTable } from "./key-technologies-sub-components/news-table"
// Example key area components
const KeyAreaOne = () => (
  <div className="flex flex-row gap-4 items-center">
    <Image src={NeoImage} alt="Knowledge Base" width={800}/>
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2">A knowledge Base with 100000+ financial data</h1>
      <h3 className="text-lg font-bold mb-2">Access a vast repository of financial information for research and analysis.</h3>
      <p className="text-sm text-gray-500">Financial analysis is powered by more than 50 financial data points , Indicators related to quarter reports</p>
      <Button className="px-6 py-3 rounded-full  font-semibold shadow transition mt-4">
        Learn More
      </Button>
    </div>
  </div>
);

const KeyAreaTwo = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
    <div className="col-span-1">
    <EconomicChart/>
    </div>
    <div className="col-span-2">
        <div className="flex flex-col">
    <h1 className="text-xl font-bold mb-2">Economic Indicators - Find Important Indicators -Impact</h1>
    <EconomicIndicators />
    <Button className="px-6 py-3 rounded-full  font-semibold shadow transition mt-4">
        Learn More
    </Button>
        </div>
    </div>
  </div>
);

const KeyAreaThree = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
    <div className="col-span-1">
    <NewsChart/>
    </div>
    <div className="col-span-2">
        <div className="flex flex-col">
    <h1 className="text-xl font-bold mb-2">News - Find Important News -Impact</h1>
    <NewsTable/>
    <Button className="px-6 py-3 rounded-full  font-semibold shadow transition mt-4">
        Learn More
    </Button>
        </div>
    </div>
  </div>
);

const keyAreaComponents = [KeyAreaOne, KeyAreaTwo, KeyAreaThree];

export function KeyTechnology() {
  return (
    <div className="px-4 sm:px-4 md:px-8 lg:px-16">
    <Carousel className="w-full mx-auto">
      <CarouselContent>
        {keyAreaComponents.map((Component, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Component />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
}
