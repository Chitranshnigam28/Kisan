import { motion } from "framer-motion";
import Feature1 from "../../Assets/landingPage/feature1.png";
import Feature2 from "../../Assets/landingPage/feature2.png";
import Feature3 from "../../Assets/landingPage/feaeture3.png";
import Feature4 from "../../Assets/landingPage/feature4.png";

export default function FeaturesSection() {
  const features = [Feature1, Feature2, Feature3, Feature4];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: [0, 3, -3, 0], // Adds a tilt effect while hovering
      zIndex: 10,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
    },
  };

  return (
    <section className="feature-sections">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="feature-div"
          variants={imageVariants}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <motion.img
            src={feature}
            alt={`Feature ${index + 1}`}
            className="feature-image"
          />
        </motion.div>
      ))}
    </section>
  );
}
