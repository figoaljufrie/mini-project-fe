import React from "react";

interface SocialIconProps {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube";
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  platform,
  size = 24,
  className = "",
  onClick,
}) => {
  const icons = {
    facebook: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    instagram: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" />
      </svg>
    ),
    linkedin: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    youtube: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  };

  return (
    <div
      className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      onClick={onClick}
    >
      {icons[platform]}
    </div>
  );
};

// Export individual icons for convenience
export const FacebookIcon = (props: Omit<SocialIconProps, "platform">) => (
  <SocialIcon platform="facebook" {...props} />
);

export const TwitterIcon = (props: Omit<SocialIconProps, "platform">) => (
  <SocialIcon platform="twitter" {...props} />
);

export const InstagramIcon = (props: Omit<SocialIconProps, "platform">) => (
  <SocialIcon platform="instagram" {...props} />
);

export const LinkedInIcon = (props: Omit<SocialIconProps, "platform">) => (
  <SocialIcon platform="linkedin" {...props} />
);

export const YouTubeIcon = (props: Omit<SocialIconProps, "platform">) => (
  <SocialIcon platform="youtube" {...props} />
);

// Example component showing different ways to use social icons
export const SocialMediaBar: React.FC<{
  variant?: "horizontal" | "vertical" | "grid";
  size?: number;
  className?: string;
}> = ({ variant = "horizontal", size = 24, className = "" }) => {
  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      facebook: "https://facebook.com/eventapp",
      twitter: "https://twitter.com/eventapp",
      instagram: "https://instagram.com/eventapp",
      linkedin: "https://linkedin.com/company/eventapp",
      youtube: "https://youtube.com/eventapp",
    };

    const link = socialLinks[platform as keyof typeof socialLinks];
    if (link) {
      window.open(link, "_blank");
    }
  };

  const baseClasses = "flex gap-4";
  const variantClasses = {
    horizontal: "flex-row justify-center",
    vertical: "flex-col items-center",
    grid: "flex-wrap justify-center max-w-xs",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <FacebookIcon size={size} onClick={() => handleSocialClick("facebook")} />
      <TwitterIcon size={size} onClick={() => handleSocialClick("twitter")} />
      <InstagramIcon
        size={size}
        onClick={() => handleSocialClick("instagram")}
      />
      <LinkedInIcon size={size} onClick={() => handleSocialClick("linkedin")} />
      <YouTubeIcon size={size} onClick={() => handleSocialClick("youtube")} />
    </div>
  );
};
