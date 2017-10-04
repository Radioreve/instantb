module.exports = {
  obj: {
    landing: {
      id: "landing",
      hex: "#ffe500",
      logo_url: "img/logo/logo_icon_black.jpg",
      title: "Un traiteur pas comme les autres",
      //navie_opts: "revealed",
      navie_active: "landing",
      page_url: "/index.html.njk",
      page_title: "Instant-B | Animations entreprise, soirées, bars à thème et évènement",
      page_description: "Découvrez nos animations pour vos évènements d'entreprise : bar à smoothies, fontaine de chocolat, animation crêpes, bar à cocktails, food truck, buffets traiteurs, animations glaces… Votre évènement entreprise sur mesure : soirées, stands, séminaires, avec Instant-B."
    },
    vita: {
      id: "vita",
      index: 1,
      slider_start: true,
      slider: true,
      hex: "#6cad2e",
      title: "Instants vitaminés",
      desc: "De savoureux fruits et légumes frais transformés à la demande en smoothies, salades ou soupes et servis en live sur votre événement !",
      hashtags: ["smoothies", "salades", "soupes"],
      logo_url: "img/logo/logo_text_green_mk.png",
      main_url: "img/vita_main_banner.jpg",
      navie_active: "services",
      page_url: "/instants-vitamines.html",
      page_title: "Instant vitaminé | Animation smoothies, bar à salades, bar à soupes",
      page_description: "Des fruits et légumes frais mixés et préparés devant vos convives, nos animations smoothies, salades et soupes sauront séduire vos invités !"
    },
    yummy: {
      id: "yummy",
      index: 2,
      slider: true,
      hex: "#f7b55c",
      title: "Instants gourmands",
      desc: "Nos fontaines de chocolat et nos animations crêpes, gaufres et cafés gourmands vous feront oublier que la gourmandise est un vilain défaut !",
      hashtags: ["crêpes", "fontaîneChoco", "caféGourmand"],
      logo_url: "img/logo/logo_text_orange_mk.png",
      main_url: "img/gourmand_main_banner.jpg",
      navie_active: "services",
      page_url: "/instants-gourmands.html",
      page_title: "Instant gourmand | Fontaîne de chocolat, animations crèpes, gaufres, cafés et thés gourmands",
      page_description: "Notre fontaine de chocolat, nos animations crêpes ou gaufres ainsi que notre bar à cafés, thés et chocolats gourmands émerveilleront les papilles de vos invités."
    },
    child: {
      id: "child",
      index: 3,
      slider: true,
      hex: "#ed57a1",
      title: "Instants souvenirs d'enfance",
      desc: "Nos animations barbe à papa, pop-corn et notre candy bar transporteront vos convives en enfance le temps de votre événement !",
      hashtags: ["bonbons", "barbapapas", "popcorn"],
      logo_url: "img/logo/logo_text_pink_mk.png",
      main_url: "img/enfance_main_banner.jpg",
      navie_active: "services",
      page_url: "/instants-souvenirs.html",
      page_title: "Instant souvenir d'enfance | Animation barbe à papa, pop-corn, candy bar",
      page_description: "Nos animations barbe à papa, pop-corn ou notre candy bar renverront vos invités quelques années en arrière."
    },
    apero: {
      id: "apero",
      index: 4,
      slider: true,
      hex: "#eb6d5b",
      title: "Instants apéritifs",
      desc: "Notre bar à cocktails et nos sélections de vins, champagnes et bières feront le plaisir de tous et rendront vos réceptions festives et inoubliables !",
      hashtags: ["cocktails", "vins", "champagne", "bières"],
      logo_url: "img/logo/logo_text_red_mk.png",
      main_url: "img/apero_main_banner.jpg",
      navie_active: "services",
      page_url: "/instants-aperitifs.html",
      page_title: "Instant apéritif | Bar à cocktails, champagne, vin, bière",
      page_description: "Notre bar à cocktail, notre bar à vins et notre bar à bière sont idéals pour tous se retrouver lors d’un moment convivial. Nos barmen sauront surprendre vos invités avec leurs différentes recettes et mise en scène (flair) !"
    },
    snack: {
      id: "snack",
      index: 5,
      slider: true,
      hex: "#c68d4e",
      title: "Instants snacking",
      desc: "Nos Bagels, hot-dogs, burgers, panini, pizzas…sont confectionnés sur place et servis à la demande.",
      hashtags: ["bagels", "hotdog", "paninis", "burgers"],
      logo_url: "img/logo/logo_text_brown_mk.png",
      main_url: "img/snacking_main_banner.jpg",
      navie_active: "services",
      page_url: "/instants-snacking.html",
      page_title: "Instant snacking | bagels, hot-dogs, burgers, paninis, pizzas, croques monsieur…",
      page_description: "Découvrez tous nos concepts Snacking de Food truck en entreprise à consommer à chaque instant : bagels, hot-dogs, burgers, paninis, pizzas, croques monsieur… Tous nos produits sont réalisés sur place à la demande de vos invités !"
    },
    fresh: {
      id: "fresh",
      index: 6,
      slider: true,
      hex: "#5FC5F0",
      title: "Instants fraîcheur",
      desc: "Idéal pour vos évènements estivaux, nos animations frozen yogourts, glaces à l’italienne, granite et sorbets moléculaires rafraichirons vos invités à coup sûr !",
      hashtags: ["sorbets", "glaces", "frozenYaourt"],
      logo_url: "img/logo/logo_text_blue.png",
      main_url: "img/fraicheur_main_banner.jpg",
      navie_active: "services",
      page_url: "/instants-fraicheur.html",
      page_title: "Instant fraîcheur | Animation frozen yogurt, glace, sorbet moléculaire",
      page_description: "L’instant fraicheur c’est une multitude d’animations pour rafraichir vos convives : glaces à l’italienne, frozen yogurt, granités, sorbets moléculaires."
    },
    events: {
      id: "events",
      hex: "#ffe500",
      title: "Votre évènement clé en main",
      desc: "Instant-B s’occupe de la gestion globale de vos événements en vous accompagnant sur la recherche de lieux, la restauration, le matériel et les performers",
      types: [
        {
          id: "location",
          name: "Lieux",
          icon_url: "img/icons/houses.svg",
          img_url: "img/event_location_main.jpg",
          prestas: {
            label: "Exemples de lieux",
            list: ["Péniche", "Rooftop", "Terrasse", "Club"]
          },
          desc: "Grâce à ses nombreux partenaires, Instant-B est en mesure de vous proposer une multitude de lieux dans Paris et ses alentours"
        },
        {
          id: "cater",
          name: "Catering",
          icon_url: "img/icons/cutlery.svg",
          img_url: "img/event_cater_main.jpg",
          prestas: {
            label: "Animations culinaires et buffets traiteurs",
            list: ["Animations culinaires", "Buffet asiatique", "Buffet terroir", "Pièces traiteurs"]
          },
          desc: "Composez votre catering avec nos différents instants et nos buffets traiteurs"
        },
        {
          id: "performers",
          name: "Performers",
          icon_url: "img/icons/headphones.svg",
          img_url: "img/event_performers_main.jpg",
          prestas: {
            label: "Exemples de performers",
            list: ["DJs", "Musiciens", "Barman Flair", "Magiciens"]
          },
          desc: "Pour animer vos évènements, nos performers mettent à disposition leur talent pour rendre ce moment inoubliable"
        },
        {
          id: "photos",
          name: "Photos et vidéos",
          icon_url: "img/icons/photo-camera.svg",
          img_url: "img/event_photos_main.jpg",
          prestas: {
            label: "Exemples d’animations",
            list: ["Photographe", "Reportage vidéo", "Photobox", "Polaroid"]
          },
          desc: "Pour immortaliser votre évènement, Instant-B met à votre disposition de nombreuses animations :"
        },
        {
          id: "activities",
          name: "Activités",
          icon_url: "img/icons/vr.svg",
          img_url: "img/event_activities_main.jpg",
          prestas: {
            label: "Exemples d'activités",
            list: ["Baby-foot", "Ping-Pong", "Karaoké", "Jeux vidéos"]
          },
          desc: "Pour divertir vos convives lors de votre évènement, Instant-B vous propose une multitude d’activités qui sauront les réjouir"
        },
        {
          id: "transports",
          name: "Transport",
          icon_url: "img/icons/van.svg",
          img_url: "img/event_transport_main.jpg",
          prestas: {
            label: "Type de véhicules",
            list: ["Berline", "Van", "Mini-bus"]
          },
          desc: "Instant-B a noué de nombreux partenariats avec des sociétés de transport afin de conduire vos invités sur le lieu de votre évènement"
        }
      ],
      logo_url: "img/logo/logo_text_yellow_mk.png",
      main_url: "img/events.jpg",
      navie_active: "events",
      page_url: "/evenements.html",
      page_title: "Votre évènement clé en main | Salle, lieu, matériel, DJ, photographe, magicien…",
      page_description: "Instant-B vous accompagne sur la gestion clé en main de vos événements : lieux, restauration, performers, matériels"
    },
    quote: {
      id: "quote",
      hex: "#ffe500",
      logo_url: "img/logo/logo_text_yellow_mk.png",
      main_url: "img/vita_main_banner.jpg",
      navie_active: "quote",
      page_url: "/devis.html",
      page_title: "Instant-B | Devis",
      page_description: "Votre devis pour tout le catalogue de nos prestations en moins de 48 heures !"
    },
    photos: {
      id: "photos",
      hex: "#ffe500",
      navie_active: "photos",
      logo_url: "img/logo/logo_text_yellow_mk.png",
      page_url: "/photos.html",
      page_title: "Instant-B | Photos",
      page_description: "Découvrez notre galerie de photos prises lors de nos évènements"
    },
    survey: {
      id: "survey", hex: "#ffe500",
      logo_url: "img/logo/logo_text_yellow_mk.png",
      navie_active: "landing",
      page_url: "/survey.html",
      page_title: "Instant-B | Questionnaire",
      page_description: "Votre avis compte !"
    }
  }
};
