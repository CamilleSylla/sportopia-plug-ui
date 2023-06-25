import lang from "../../lang/fr.json";
export default function Pending() {
  const svgCode = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <style>
        .spinner_9Mto {
          animation: spinner_5GqJ 1.6s linear infinite;
          animation-delay: -1.6s;
        }
        .spinner_bb12 {
          animation-delay: -1s;
        }
        @keyframes spinner_5GqJ {
          12.5% { x: 13px; y: 1px; }
          25% { x: 13px; y: 1px; }
          37.5% { x: 13px; y: 13px; }
          50% { x: 13px; y: 13px; }
          62.5% { x: 1px; y: 13px; }
          75% { x: 1px; y: 13px; }
          87.5% { x: 1px; y: 1px; }
        }
      </style>
      <rect class="spinner_9Mto" x="1" y="1" rx="1" width="10" height="10" />
      <rect class="spinner_9Mto spinner_bb12" x="1" y="1" rx="1" width="10" height="10" />
    </svg>
  `;
  return (
    <div className=" w-full h-full flex items-center justify-center flex-col space-y-4 text-white">
      <h1 className=" text-lg font-medium ">{lang.loading}</h1>
      <div className=" fill-white" dangerouslySetInnerHTML={{ __html: svgCode }} />
    </div>
  );
}
