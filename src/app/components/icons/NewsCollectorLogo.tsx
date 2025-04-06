const NewsCollectorLogo: React.FC = () => {
  return (
    <svg
      viewBox="0 0 150 150"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="w-full h-full"
    >
      <rect x="20" y="25" width="100" height="100" rx="20" fill="#6A0DAD" />
      <path d="M50 55h40v10H50zm0 20h40v10H50zm0 20h25v10H50z" fill="#ffffff" />
      <circle cx="95" cy="100" r="20" stroke="#ffffff" strokeWidth="6" />
      <line
        x1="105"
        y1="110"
        x2="120"
        y2="125"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NewsCollectorLogo;
