# Egységesítés

Szóhasználati és írásjel-jegyzék a magyar nyelvű szövegekhez: válaszok, összefoglalók, a
felhasználónak szóló jegyzetek. A repó dokumentációja (`docs/`, `PRINT.md`, `FILM.md`, kódkommentek)
angol marad. Ha egy szó itt szerepel, mindenhol így írom; ha új szó kerül elő, ide veszem fel.

## Írásszabályok

- Hosszú gondolatjel (—) nincs. Helyette vessző, zárójel vagy rövid kötőjel (-).
- Bizonyosság jelölése állítás előtt: **[Biztos]** erős bizonyíték, **[Valószínű]** szilárd
  következtetés, **[Találgatás]** hiányzó információ pótlása. Ha a válasz nagy része találgatás,
  ezt az elején jelzem.
- A kellemetlen hír kerül előre. Bevezető és bemelegítő bekezdés nincs.
- Kerülendő fordulatok: „Remek kérdés”, „Teljesen igazad van”, „Ez nagyon logikus”,
  „Teljesen”, „Mindenképpen”.
- Egyet nem értésnél: „Nem értek egyet, mert … Ehelyett én a következőket tenném: …
  A megközelítésed kockázata: …”
- Mértékegység: szám és jel között szóköz (2160 px, 24 m, 6,8 px). Tizedesvessző magyar
  szövegben, tizedespont kódban és fájlnévben.
- Szorzásjel méretnél: 2160 × 1620 (szóközökkel, × jellel).
- Fájl- és kódnevek `kódformázásban`, ragozásuk kötőjellel: `PRINT.md`-ben, `seek()`-kel.

## Riso és nyomdai szavak

| Angol (repó) | Magyarul | Megjegyzés |
|---|---|---|
| print | nyomat | Egy kép a sorozatban. |
| series | sorozat | |
| plate | lemez | A repó értelmében egy festék kivonata, nem a riso mesterstencil. |
| ink | festék | A hét festék neve angolul marad kódban (`indigo`, `pink`…). |
| screen, halftone | raszter, rasztertónus | |
| screen pitch | rasztertávolság | px-ben, eszközpixelben mérve. |
| coverage | fedés | 0-1 közötti érték; 0,4 = 40%-os raszter. |
| overprint | felülnyomás | A sötétek felülnyomással készülnek, tiszta fekete nincs. |
| knockout | kiütés | [Találgatás] a nyomdai szóhasználatra; első előfordulásnál zárójelben az angol. |
| registration / misregistration | illesztés / illesztési hiba (passzerhiba) | [Valószínű] a „passzer” nyomdai szó. |
| starvation | festékhiány | A tömör felület apró, festék nélküli foltjai. |
| paper, stock | papír | |
| bake | előállítás (bake) | A lemezek egyszeri, végleges méretű raszterezése. |
| contact sheet | kontaktlap | |
| value view | értékkép | A kép világos-sötét szerkezete szín nélkül. |
| 1:1 crop | 1:1 kivágás | |

## Színházi szavak

| Angol | Magyarul | Megjegyzés |
|---|---|---|
| auditorium, house | nézőtér | |
| horseshoe auditorium | patkó alakú nézőtér | |
| stalls | földszint, zsöllye | A zsöllye maga az ülés. |
| box, tier of boxes | páholy, páholysor | |
| gallery (top balcony) | karzat | |
| proscenium (arch) | portál, színpadnyílás | |
| forestage edge, footlights | rivalda, rivaldafény | |
| orchestra pit | zenekari árok | |
| wings | takarás | „a takarásban áll”. |
| wing flat | kulissza | |
| border | szoffita | [Valószínű] felső takaró sáv. |
| fly tower, fly loft | zsinórpadlás | |
| fly rail, lines | zsinórpadlás korlátja, kötelek | |
| painted backdrop | prospektus, festett háttér | [Valószínű] a „prospektus” színpadi szakszó. |
| follow spot | fejgép | [Valószínű] kezelője a fejgépes. |
| stage manager, SM desk | ügyelő, ügyelőpult | |
| fire curtain | vasfüggöny | |
| ghost light | ügyeleti lámpa (ghost light) | [Találgatás] bevett magyar megfelelőt nem találtam; leíró név. |
| haze | füst, köd | A fénysávot láthatóvá tevő pára. |
| entrance (actor's) | belépő | |

## Döntésnapló

- 2026-09-30: az `egysegesites.md` a repó gyökerében jött létre, a felhasználó kérésére.
- 2026-09-30: a színházi sorozat mappája `prints/theatre`, angol címe *Theatre*. A repó többi
  sorozatneve is angol (Cabinet, Sceneries, Workings).
- 2026-09-30: a felhasználó a „vonatablak” (Window Seat) effektből a fix keretet választotta.
  A sorozatelv ettől kezdve: egy páholy, egy este, három pillanat (Előtte, Közben, Utána).
  A takarásos nézőpont és a várakozó színész kiesett.
- 2026-09-30: a „keret” szó a felhasználónál itt a szerkezeti vázat jelenti (a méterben
  felépített színházmodellt), nem képkeretet.

## További szavak

| Angol | Magyarul | Megjegyzés |
|---|---|---|
| box seat, window seat | páholy, ablak melletti ülés | A sorozatban a páholy a Window Seat ablaka. |
| parapet cushion | párkány, páholypárkány | A bársonnyal bevont mellvéd teteje. |
| valance, swag | drapéria, fodros drapéria | A páholynyílás felső függönye. |
| tie-back curtain | felkötött függöny | |
| opera glasses | színházi látcső | |
| programme | műsorfüzet | |
| house curtain | főfüggöny | A portálban leereszthető vörös függöny. |
| exit sign | vészkijárat-jelzés | |
