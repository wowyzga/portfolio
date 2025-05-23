import React from "react";
import { volunteerWork } from "@/lib/data";
import { headerValues } from "@/lib/data";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import ImageGallery from "./ImageGallery";

const images = Object.values(import.meta.glob("../images/volunteer/*", { eager: true }));

function VolunteerTag({ volunteer, index }: { volunteer: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.05 * index,
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-3 py-2 bg-muted/80 backdrop-blur-sm rounded-md text-sm border border-purple-500/10 shadow-sm mb-4"
    >
      <div className="flex justify-between items-center mb-1 w-full">
        <span className="font-semibold text-base text-purple-700 dark:text-purple-300 text-left">{volunteer.organization}</span>
        <span className="text-xs text-muted-foreground text-right">{"📅 " + volunteer.period}</span>
      </div>
      <ul className="list-disc ml-5 space-y-1">
        {volunteer.details && volunteer.details.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const volunteerCategoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function VolunteerSection() {
  return (
    <section
      id={headerValues[3].name}
      className="py-12 bg-gradient-to-b from-background to-muted/20 scroll-mt-[5rem]"
    >
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
              {headerValues[3].icon}
            </motion.span>
            {headerValues[3].title}
          </h2>
        </MotionWrapper>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
            {volunteerWork.map((volunteer, index) => (
                <motion.div variants={volunteerCategoryVariants}>
                    <GlassCard className="p-4">
                      <div className="flex justify-between items-center mb-1 w-full">
                        <h3 className="text-lg font-medium text-left">{volunteer.position}</h3>
                        <span className="text-xs text-muted-foreground text-right">{"🌍 " + volunteer.location}</span>
                      </div>
                      <VolunteerTag volunteer={volunteer} index={index} />
                    </GlassCard>
                </motion.div>
            ))}

            {/* Volunteer Image Gallery */}
            <motion.div variants={volunteerCategoryVariants}>
                <GlassCard className="p-4">
                    <div className="flex justify-between items-center mb-1 w-full">
                        <h3 className="text-lg font-medium text-left">🖼 Gallery</h3>
                    </div>
                    <ImageGallery images={images.map((file: any) => file.default.src)} />
                </GlassCard>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
