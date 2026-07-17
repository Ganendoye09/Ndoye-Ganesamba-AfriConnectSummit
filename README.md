# AfriConnect Summit 2027 — Site vitrine

**Étudiant(e) :** _Ndoye Gane samba_
**Classe :** _L1 IAGE nr_

## Description du projet

Site vitrine complet pour **AfriConnect Summit**, une conférence tech panafricaine
fictive réunissant développeurs, entrepreneurs et investisseurs du continent
(10–12 mars 2027, Dakar, Sénégal). Le site comprend 4 pages : accueil, programme,
intervenants et inscription/contact, dans un style web moderne 2026 avec dark mode,
animations sobres et navigation responsive.

## Technologies utilisées

- **HTML5** sémantique (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** : variables CSS, Flexbox, CSS Grid, animations, media queries, Google Fonts
- **JavaScript vanilla** (aucun framework, aucune librairie) : DOM, événements,
  `IntersectionObserver`, `localStorage`, validation de formulaire
- **Bootstrap Icons** (CDN) pour les icônes
- **Google Fonts** : Unbounded (titres) & Plus Jakarta Sans (texte courant)

## Fonctionnalités JavaScript implémentées

1. Dark mode / Light mode avec persistance via `localStorage`
2. Navbar dynamique au défilement + menu hamburger mobile
3. Animations d'apparition au scroll via `IntersectionObserver`
4. Compte à rebours en temps réel jusqu'à la conférence
5. Compteurs de statistiques animés au scroll
6. Onglets du programme (Jour 1 / 2 / 3) sans rechargement de page
7. Filtrage dynamique des intervenants par thématique
8. Validation complète du formulaire d'inscription (regex email, téléphone,
   longueur du message) avec retour visuel par champ
9. Bouton retour en haut après 300px de défilement
10. Année dynamique dans le footer (`new Date().getFullYear()`)

La FAQ de la page Contact est un accordéon **CSS pur** (`:checked`), sans JavaScript.

## Structure du projet

```
NOM-Prenom-AfriConnectSummit/
├── index.html
├── programme.html
├── intervenants.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
└── README.md
```

## Lien GitHub Pages

https://ganendoye09.github.io/Ndoye-Ganesamba-AfriConnectSummit/

## Ressources consultées

- [MDN Web Docs](https://developer.mozilla.org/fr/)
- [CSS-Tricks — Flexbox & Grid](https://css-tricks.com/)
- [Google Fonts](https://fonts.google.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Unsplash](https://unsplash.com/) — photos libres de droits
- [Coolors](https://coolors.co/) — palette de couleurs
- [W3C Validator](https://validator.w3.org/)
