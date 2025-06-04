import React from "react";

function Footer() {
  const footerData = [
    {
      type: "logo",
      content: <img src="/logo2.png" alt="Logo" className="h-16" />,
    },
    {
      title: "Enlaces",
      items: [
        { label: "Categorías", href: "#" },
        { label: "Sobre nosotros", href: "#" },
        { label: "Catálogo", href: "#" },
        { label: "Contacto", href: "#" },
      ],
    },
    {
      title: "Soporte",
      items: [
        { label: "Soporte", href: "#" },
        { label: "Delivery", href: "#" },
        { label: "Ayuda y soporte", href: "#" },
        { label: "24/7 Servicios", href: "#" },
      ],
    },
    {
      title: "Contacto",
      items: [
        { label: "+123 45678 945" },
        { label: "floreria@gmail.com" },
        { label: "123 Miraflores" },
        { label: "8:00 am - 8:00 pm" },
      ],
    },
  ];

  return (
    <footer className="bg-flor-2 text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-10 pb-10 px-6">
        {footerData.map((section, index) => (
          <div key={index} className="flex flex-col items-start justify-center px-2">
            {section.type === "logo" ? (
              <div className="w-full flex justify-center">{section.content}</div>
            ) : (
              <>
                <h4 className="font-semibold mb-3 md:text-left text-center w-full">{section.title}</h4>
                <ul className="space-y-2 text-sm md:text-left text-center w-full">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <a href={item.href || "#"} className="hover:underline">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-sm border-t border-white/20 pt-4 pb-6">
        Florería Lulu © 2023 Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;
