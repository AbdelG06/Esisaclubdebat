# ESISA Debate Club

Site officiel du **Debate Club ESISA**, conçu pour présenter le club, son bureau et sa vision, tout en permettant aux étudiants de s'inscrire dans l'une des sections du club.

Le projet combine une vitrine éditoriale moderne, une page pédagogique consacrée au débat et un espace d'administration sécurisé pour suivre les inscriptions.

## Aperçu

Le site propose :

- Une page d'accueil orientée découverte et inscription.
- Une présentation claire du débat et de la différence avec le public speaking.
- Une page **Notre bureau** avec les membres et leurs profils Instagram.
- Des liens directs vers l'Instagram officiel et le groupe WhatsApp du club.
- Un formulaire d'inscription responsive avec validation côté client.
- Une confirmation d'inscription personnalisée.
- Un espace admin privé accessible via `/admin`.
- Un tableau de bord avec statistiques, filtres, recherche, export CSV et suivi des inscriptions.

## Fonctionnalités

### Expérience publique

- Design responsive desktop, tablette et mobile.
- Navigation adaptée aux petits écrans avec menu hamburger.
- Direction artistique inspirée du logo : bleu profond, doré et typographie éditoriale.
- Sections en français, arabe et anglais.
- Animations et états de sélection légers.
- Liens vers :
  - Instagram : <https://www.instagram.com/esisa_debateclub/>
  - Groupe WhatsApp : <https://chat.whatsapp.com/GlhCH2SstNFB8k6A8rH98d>

### Inscription

Le formulaire collecte :

- Nom et prénom.
- Numéro de téléphone marocain.
- Niveau d'étude.
- Section souhaitée : française, arabe ou anglaise.
- Expérience préalable en débat ou prise de parole.

Le formulaire inclut :

- Validation instantanée des champs touchés.
- Indicateur de progression.
- Protection honeypot basique contre les soumissions automatisées.
- Détection des numéros déjà inscrits.
- État de chargement et messages d'erreur explicites.

### Administration

L'espace admin est volontairement absent de la navigation publique :

Il permet aux administrateurs authentifiés de :

- Consulter les inscriptions.
- Rechercher par nom, prénom ou téléphone.
- Filtrer par section, niveau et expérience.
- Trier les résultats.
- Ajouter une note et un commentaire.
- Supprimer une inscription.
- Exporter les données au format CSV.
- Visualiser des statistiques et graphiques.

## Stack technique

- [React](https://react.dev/) 18
- [Vite](https://vite.dev/) 6
- [Supabase](https://supabase.com/) pour l'authentification et la base de données
- [Lucide React](https://lucide.dev/) pour les icônes
- [Recharts](https://recharts.org/) pour les visualisations admin
- CSS responsive personnalisé


## Structure du projet

```text
.
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── FieldError.jsx
│   │   └── Logo.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   ├── AdminPage.jsx
│   │   ├── BureauPage.jsx
│   │   ├── DebatePage.jsx
│   │   └── RegistrationPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── supabase/
│   └── schema.sql
├── index.html
├── package.json
└── vite.config.js
```

## Licence

Projet développé pour le **Debate Club ESISA**. Tous les éléments de marque et contenus propres au club restent la propriété de leurs ayants droit.
