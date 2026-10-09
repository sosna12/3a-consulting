import React, { useEffect, useState } from "react";

const messages = [
  "Reporting Channels Hotline: +251-910 120 305",
  "Reporting Channels — You can confidentially or anonymously report suspicious activities",
  "Reporting Channels via Email: Awoke@3aconsulting.com",
];

export default function ReportingBanner() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true); // fade in new message
      }, 400); // fade-out duration
    }, 4000); // 4 seconds per message

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reporting-banner">
      <h3 className={`reporting ${fade ? "fade-in" : "fade-out"}`}>
        {messages[index]}
      </h3>
    </div>
  );
}