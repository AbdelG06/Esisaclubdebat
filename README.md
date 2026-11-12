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

L'espace admin est volontairement absent de la navigation publique. Il est accessible directement via :

```text
/admin
```

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

## Prérequis

- Node.js 18 ou version ultérieure.
- npm.
- Un projet Supabase pour activer les inscriptions et l'administration.

## Installation

Cloner le projet puis installer les dépendances :

```bash
git clone https://github.com/AbdelG06/Esisaclubdebat.git
cd Esisaclubdebat
npm install
```

Créer un fichier `.env` à la racine :

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

> Ne jamais publier `.env`. Le fichier est ignoré par Git. Utilisez `.env.example` pour documenter les variables sans exposer de secret.

## Configuration Supabase

1. Créer un projet Supabase.
2. Ouvrir **SQL Editor**.
3. Exécuter le contenu de [`supabase/schema.sql`](./supabase/schema.sql).
4. Créer un utilisateur administrateur dans **Authentication**.
5. Activer la réplication realtime de la table `inscriptions` dans les publications Supabase.
6. Renseigner les variables du fichier `.env`.

Le schéma configure :

- La table `inscriptions`.
- Les contraintes de validation.
- L'unicité du numéro de téléphone.
- Row Level Security.
- L'insertion publique des inscriptions.
- La lecture, modification et suppression réservées aux utilisateurs authentifiés.

## Développement

Lancer le serveur de développement :

```bash
npm run dev
```

Le site sera disponible sur l'URL affichée par Vite, généralement :

```text
http://localhost:5173
```

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Génère le build de production |
| `npm run preview` | Prévisualise le build de production |

## Routes

| Route | Usage |
| --- | --- |
| `/` | Accueil et formulaire d'inscription |
| `/le-debat` | Présentation du débat et du public speaking |
| `/bureau` | Présentation du bureau du club |
| `/admin` | Connexion et tableau de bord d'administration |

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

## Déploiement

Le projet peut être déployé sur Vercel, Netlify, Render ou toute plateforme compatible avec Vite.

Paramètres recommandés :

- **Build command** : `npm run build`
- **Output directory** : `dist`
- **Install command** : `npm install`

Ajouter ces variables d'environnement dans la plateforme de déploiement :

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Pour une application monopage, configurer une réécriture vers `index.html` afin que les routes `/le-debat`, `/bureau` et `/admin` fonctionnent après actualisation.

## Sécurité

- Ne jamais commiter un fichier `.env`.
- La clé `VITE_SUPABASE_ANON_KEY` est une clé publique côté client, mais les règles RLS restent indispensables.
- Ne jamais exposer de clé Supabase `service_role` dans le frontend.
- Utiliser un compte administrateur Supabase dédié.
- Régénérer immédiatement toute clé qui aurait été publiée par erreur.

## Contribution

1. Créer une branche dédiée.
2. Effectuer une modification ciblée.
3. Vérifier le build avec `npm run build`.
4. Ouvrir une pull request avec une description claire.

## Licence

Projet développé pour le **Debate Club ESISA**. Tous les éléments de marque et contenus propres au club restent la propriété de leurs ayants droit.
