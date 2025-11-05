# 🕹️ 2D Akadálykerülő Játék – JavaScript & HTML5 Canvas

## 🎯 Projekt áttekintés
Ez a projekt egy egyszerű, de látványos **2D játék**, amelyben a játékos **akadályokat kerül el**, **érméket gyűjt**, és **pontszámot szerez**.  
A játék **tiszta JavaScriptben** készült, **külső könyvtárak nélkül**, és a **HTML5 Canvas API-t** használja a megjelenítéshez.
---
## 🎮 Irányítás

A játékban ugrani a Space gomb lenyomásával lehet! A menügombokat az egér lenyomásával lehet vezérelni
---

## 💡 Fő jellemzők
- 🎮 Eseményvezérelt irányítás (billentyűzet és egér)
- 💰 Érmegyűjtés és pontszám rendszer
- ⚠️ Akadályok elkerülése
- 🧱 Többrétegű háttér
- 🕒 Folyamatos animáció (`requestAnimationFrame`)
- ✨ Moduláris, objektumorientált kódszervezés

---

## 🧩 Kódszervezés

A projekt több fájlra van bontva a jobb olvashatóság és karbantarthatóság érdekében:

| Fájl | Leírás |
|------|--------|
| **`const.js`** | Alapkonstansok és beállítások |
| **`classes.js`** | A játék objektumai (pl. `Coin`, `Floor`, `Obstacle`) |
| **`game.js`** | A játék fő logikája, frissítés és kirajzolás |

Ez a struktúra támogatja az **objektumorientált** és **moduláris** programozási elveket.

---

## 🎨 Grafika

- A megjelenítés a **Canvas API**-val történik (`ctx.drawImage`, `ctx.fillText` stb.)
- A **háttér** több rétegből épül fel, így dinamikus mozgást és mélységet kelt
- A **pontszám** és **idő** kijelzése egyedi betűtípussal és színekkel történik

---

## ⚙️ Fogalmak és technológiák

| Fogalom | Jelentés |
|----------|-----------|
| **Objektumorientált programozás (OOP)** | Osztályok és objektumok használata a játék elemeinek kezelésére |
| **Eseményvezérelt logika** | Billentyűleütések és kattintások irányítják a játékmenetet |
| **Animáció és időzítés** | Folyamatos mozgás `requestAnimationFrame` segítségével |
| **Canvas grafika** | 2D megjelenítés a böngészőben |
| **Moduláris kódszervezés** | A logika és megjelenítés külön fájlokba szervezve |

---

## 🚀 Futtatás

1. Klónozd a repót:
   ```bash
   git clone https://github.com/felhasznalonev/2d-canvas-game.git
