"use client";
import { useRouter } from "next/navigation";

export const useViewTransition = () => {
  const router = useRouter();

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "scale(1)",
        },
        {
          opacity: 0,
          transform: " scale(0.5)",
        },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "circle(0% at 50% 50%)",
        },
        {
          clipPath: "circle(75% at 50% 50%)",
        },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const navigateWithTransition = (href, options = {}) => {
    const currentPath = window.location.pathname;
    if (currentPath === href) {
      return;
    }

    // Optionally trigger a simple animation before navigating
    // slideInOut();
    router.push(href, {
      ...options,
    });
  };

  return { navigateWithTransition, router };
};
