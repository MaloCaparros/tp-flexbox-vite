<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">VACHIBOX</h1>
</p>
<p align="center">
    <em>Secouez le plus rapidement possible !</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/MaloCaparros/vachibox?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/MaloCaparros/vachibox?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/MaloCaparros/vachibox?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/MaloCaparros/vachibox?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Développé avec les logiciels et outils ci-dessous.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/Sass-CC6699.svg?style=flat&logo=Sass&logoColor=white" alt="Sass">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running vachibox](#-running-vachibox)
> - [ Project Roadmap](#-project-roadmap)


---

##  Overview

Cette application a pour but de secouer le plus rapidement possible sont téléphones. Sur Pc, le but était de cliquer le plus de fois sur le bouton traire. Cette application ne fonctionne pas sur Iphone et sur les produits Apple. Lorsque vous avez fini de jouer, on peut retrouver un classement des différents utilisateurs qui ont joué avant vous.


##  Repository Structure

```sh
└── vachibox/
    ├── README.md
    ├── classement.js
    ├── icons
    │   ├── icons8-vache-16.png
    │   ├── icons8-vache-30.png
    │   ├── icons8-vache-40.png
    │   └── icons8-vache-80.png
    ├── index.html
    ├── manifest.json
    ├── package-lock.json
    ├── package.json
    ├── pages
    │   ├── classement.html
    │   └── jeu.html
    ├── server.js
    ├── src
    │   ├── js
    │   │   └── script.js
    │   ├── photo
    │   │   ├── Nouveau-projet.svg
    │   │   ├── Tonneau.png
    │   │   ├── fond-tonneau.png
    │   │   ├── fond1.jpg
    │   │   ├── fond2.jpg
    │   │   ├── screenshot
    │   │   │   ├── Capture_mobile.JPG
    │   │   │   └── Capture_pc.JPG
    │   │   └── vague.png
    │   └── styles
    │       └── styles.css
    ├── vercel.json
    └── vite.config.js
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                        | Summary                                       |
| ---                                                                                         | ---                                           |
| [index.html](https://github.com/MaloCaparros/vachibox/blob/master/index.html)               | Fichier contenant la page d'accueil du site `index.html`        |
| [server.js](https://github.com/MaloCaparros/vachibox/blob/master/server.js)                 | Serveur web déployé sur vercel `server.js`         |
| [manifest.json](https://github.com/MaloCaparros/vachibox/blob/master/manifest.json)         | Fichier créant l'application mobile `manifest.json`     |
| [package.json](https://github.com/MaloCaparros/vachibox/blob/master/package.json)           | Fichier package `package.json`      |
| [package-lock.json](https://github.com/MaloCaparros/vachibox/blob/master/package-lock.json) | Fichier package `package-lock.json` |
| [vite.config.js](https://github.com/MaloCaparros/vachibox/blob/master/vite.config.js)       | Configuration de mon vite pour qu'il puisse fonctionner avec axios `vite.config.js`    |
| [vercel.json](https://github.com/MaloCaparros/vachibox/blob/master/vercel.json)             | Configuration serveur vercel `vercel.json`       |

</details>

<details closed><summary>pages</summary>

| File                                                                            | Summary                                    |
| ---                                                                             | ---                                        |
| [jeu.html](https://github.com/MaloCaparros/vachibox/blob/master/pages/jeu.html) | Page de jeu de l'application `pages/jeu.html` |
| [classement.html](https://github.com/MaloCaparros/vachibox/blob/master/pages/classement.html) | Page classement `pages/classement.html` |

</details>

<details closed><summary>src.styles</summary>

| File                                                                                     | Summary                                           |
| ---                                                                                      | ---                                               |
| [styles.css](https://github.com/MaloCaparros/vachibox/blob/master/src/styles/styles.css) | Fichier css du projet `src/styles/styles.css` |

</details>

<details closed><summary>src.js</summary>

| File                                                                               | Summary                                      |
| ---                                                                                | ---                                          |
| [script.js](https://github.com/MaloCaparros/vachibox/blob/master/src/js/script.js) | Fichier JavaScript du projet `src/js/script.js` |

</details>

---

##  Getting Started

***Requirements***

Assurez-vous que les dépendances suivantes sont installées sur votre système :

* **HTML**: `version x.y.z`

###  Installation

1. Cloner le repository:

```sh
git clone https://github.com/MaloCaparros/vachibox
```

2. Changer de directory:

```sh
cd vachibox
```

3. Installer les dépendances:

```sh
npm install
```

###  Running vachibox

Use the following command to run vachibox:

```sh
node app.js
```

###  Running vachibox

Utilisez la commande suivante pour exécuter vachibox :

```sh
> npm run dev
```


##  Project Roadmap

- [X] `► Cliquer sur le bouton jouer`
- [ ] `► Cliquer sur le bouton start`
- [ ] `► Secouez frénétiquement votre téléphone`
