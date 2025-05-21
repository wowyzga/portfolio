import React from "react";
import { projects } from "@/lib/data";
import { headerValues } from "@/lib/data";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery";

const projectImages = [
    Object.values(import.meta.glob("../images/cards/*", { eager: true })),
    Object.values(import.meta.glob("../images/collages/*", { eager: true })),
    Object.values(import.meta.glob("../images/crochet/*", { eager: true })),
]

export default function ArtSection() {
  return (
    <section id={headerValues[4].name} className="py-12 relative scroll-mt-[5rem]">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left flex items-center">
            <motion.span
                className="inline-block mr-2"
                initial={{ rotate: 0 }}
                whileInView={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
            {headerValues[4].icon}
            </motion.span>{" "}
            {headerValues[4].title}
            </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <MotionWrapper key={project.title} delay={index * 0.2}>
              <GlassCard className="group overflow-hidden dark:border-purple-500/10 h-full flex flex-col">
                <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <CardTitle className="text-center md:text-left group-hover:text-purple-500 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ImageGallery images={projectImages[index].map((file: any) => file.default.src)} />
                </CardContent>
                <CardFooter className="flex justify-center md:justify-start items-center border-t border-border/30 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <ul className="list-disc ml-4 space-y-1 text-sm group-hover:space-y-2 transition-all duration-300">
                    {project.description.map((desc, i) => (
                      <motion.li
                        key={i}
                        className="text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {desc}
                      </motion.li>
                    ))}
                  </ul>
                </CardFooter>
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}